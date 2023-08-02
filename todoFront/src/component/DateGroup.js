import List from "./list";

export default function DateGroup() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay();




    return (
        <>
            <div>
                <p>{month}월 {date}일</p>

                <ul id="todoList">
                    <li>gkgk</li>
                    <li>ghgh</li>
                </ul>
            </div>
        </>
    )
}
