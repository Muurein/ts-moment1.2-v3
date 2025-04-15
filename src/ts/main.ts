//kursinfo
interface CourseInfo {
    code: string,
    name: string,
    progression: string,
    syllabus: string
}


//input-variabler
const inputCodeEl = document.getElementById("code") as HTMLInputElement;
const inputNameEl = document.getElementById("name") as HTMLInputElement;
const inputProgEl = document.getElementById("progression") as HTMLInputElement;
const inputSyllEl = document.getElementById("syllabus") as HTMLInputElement;

//övriga variabler
const submitButtonEl = document.getElementById("submitButton") as HTMLButtonElement;
const formEl = document.getElementById("courseForm") as HTMLFormElement;
const messageUniqueEl = document.getElementById("notUnique") as HTMLParagraphElement;
const properProgEl = document.getElementById("properProg") as HTMLParagraphElement;

//array för att lagra kurser, ska använda interfacet CourseInfos upplägg
let courses: CourseInfo[] = [];


//när sidan laddas in
window.onload = () => {
    courses = loadStorage();

    //visa kurserna som ska ligga inne från början
    if (courses.length === 0) {
        courses.push({
            code: "DT071G",
            name: "Programmering i C#.NET",
            progression: "A",
            syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT071G/"},
            {
                code: "IK060G",
                name: "Projektledning",
                progression: "A",
                syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/IK060G/"
            }
        );
    }

    storeCourses(courses);
    update();
}

//se till att knappen inte är disabled efter att kurskoden/kursprogressionen har ändrats
inputCodeEl.addEventListener("change", () => {
    submitButtonEl.disabled = false;
    messageUniqueEl.innerHTML = "";
});

inputProgEl.addEventListener("change", () => {
    submitButtonEl.disabled = false;
    properProgEl.innerHTML = "";
});


//kollar om kurskoden är unik och ser till att skicka-knappen blir disabled
function uniqueCoursecode() {
    
    for(let i = 0; courses.length > i; i++ ) {

        if (inputCodeEl.value === courses[i].code) {
            submitButtonEl.disabled = true;
            messageUniqueEl.innerHTML = "Kurskoden är ej unik";
            return false;
        } 
    }
    return true;
}


//kollar så man bara kan skriva in vissa värden i "Kursprogression" och ser till att skicka-knappen blir disabled
function progString() {

    const allowedValue = ["a", "b", "c", "A", "B", "C"];

    for(let i = 0; allowedValue.length > i; i++ ) {

        if (inputProgEl.value === allowedValue[i]) {
            return true;
        }
    }
    submitButtonEl.disabled = true;
    properProgEl.innerHTML = "Använd rätt progressionsdata";
    return false;
}


//använd användarens input
formEl.addEventListener("submit", (event): void => {
    event.preventDefault();

    //skapa ny kurs med hjälp av CourseInfo interface
    const newCourse: CourseInfo = {
        code: inputCodeEl.value,
        name: inputNameEl.value,
        progression: inputProgEl.value,
        syllabus: inputSyllEl.value
    }
    
    if (uniqueCoursecode() === false) {
        return;
    }
    
    if (progString() === false) {
        return;
    }

    //lägg till nya kursen i arrayen
    courses.push(newCourse);

    storeCourses(courses);
    update();
})


//ta bort innehåll i sumbittedCoruses (div)
function update(): void {
    const coursesDivEl = document.getElementById("submittedCourses") as HTMLDivElement;

    coursesDivEl.innerHTML = "";

    //konstruktionen
    courses.forEach((course, index) => {
        coursesDivEl.innerHTML +=
        `<article>
        <h3>Kurs:</h3>
        <p>Kurskod: ${course.code}</p>
        <p>Kursnamn: ${course.name}</p>
        <p>Kursprogression: ${course.progression}</p>
        <p>Kursplan: ${course.syllabus}</p>
        </article>`;
    }) 
}


//lagra kurser
function storeCourses(data: CourseInfo[]): void {
    localStorage.setItem("courses", JSON.stringify(data));
}

//ladda in kurser
function loadStorage(): CourseInfo[] {
    //om courses är null, använd istället en tom array
    return JSON.parse(localStorage.getItem("courses") ?? "[]") as CourseInfo[];
}


