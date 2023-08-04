import { api } from "./api";

// todo 추가
export async function createTodo(date, content) {
    const res = await fetch(`${api}/todo`, {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).token,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({date, content})
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 조회
export async function getTodosAll() {
    const res = await fetch(`${api}/todo`, {
        method: 'GET',
        headers: {"Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).token}
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 날짜별 조회
// export async function getTodos(date) {
//     const res = await fetch(`${api}/todo/${date}`, {
//         method: 'GET',
//         headers: {"Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).token}
//     })

//     if(!res.ok) {
//         throw new Error(`${res.status} ${res.statusText}`)
//     }

//     return await res.json();
// }

// todo 수정
export async function updateTodo(id, date, content, checked) {
    const res = await fetch(`${api}/todos/${id}/update`, {
        method: "PUT",
        headers: {
            "Authorization" : "Bearer " + JSON.parse(localStorage.getItem('user')).token,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            date,
            content,
            checked
        })
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// todo 삭제
export async function deleteTodo(id) {
    const res = await fetch(`${api}/todo/${id}/delete`, {
        method: "DELETE",
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return res;
}