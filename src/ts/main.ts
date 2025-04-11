//kursinfo
interface CourseInfo {
    code: string,
    name: string,
    progression: string,
    syllabus: string
}

//write out input
function writeOutInput(course: CourseInfo): void {
    const coursesDivEl = document.getElementById("sumbittedCourses") as HTMLDivElement;

    if(coursesDivEl) {
        coursesDivEl.innerHTML =
        `<article>
        <h3>Kurs:</h3>
        <p>Kurskod: ${course.code}</p>
        <p>Kursnamn: ${course.name}</p>
        <p>Kursprogression: ${course.progression}</p>
        <p>Kursplan: ${course.syllabus}</p>
        </article>`;
    }
}