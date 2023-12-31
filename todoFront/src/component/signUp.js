import { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { signUp } from "../request/user";
import { useNavigate, Navigate, Link } from "react-router-dom";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const roles = "user"

    if(user) {
        return <Navigate to="/todo" replace={true}/>
    }
    
    async function handleSubmit(e) {

        try {
            e.preventDefault();
            setError(null);
            await signUp(email, password);
            console.log('테스트 성공')

            alert('welcome')
            navigate('/signIn',{ replace: true});

        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    return (
        <div id="signUp">
            <form onSubmit={handleSubmit} className="w-96 p-4 mt-16 mx-auto text-center border border-green-400 border-8 px-8 pb-16 ">
                <h1 className="font-bold text-4xl py-12">회원가입</h1>
                <div className="pb-8">
                    <label className="w-full flex justify-between">
                        <span>이메일</span>
                        <input 
                            data-testid="email-input"
                            className="border-green-500 border rounded-full px-2"
                            name="email"
                            type="text"
                            autoComplete="off"
                            onChange={({target}) => setEmail(target.value)}
                        />
                    </label>
                </div>
                <div className="pb-8">
                    <label className="w-full flex justify-between">
                        <span>비밀번호</span>
                        <input
                            data-testid="password-input" 
                            name="password"
                            placeholder="8자리 이상 입력"
                            className="border-green-500 border rounded-full px-2"
                            type="password"
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </label>
                    {password.length > 0 && password.length < 8 ? <p className="float-right pb-2 text-green-500">8자리 이상 입력해주세요.</p> : null}
                </div>
                {error && <p className="text-sm text-green-500">회원가입에 실패했습니다. <br/> 다시 시도해주세요.</p>}
                <button 
                    data-testid="signup-button" 
                    type="submit" 
                    className="p-2 px-4 rounded-3xl bg-green-500 font-semibold text-white disabled:bg-green-300"
                    disabled={!email.trim() || password.trim().length < 8} 
                >
                    회원가입
                </button>
                <a href="/signin" className="block pt-4 text-blue-700 underline">로그인 하러가기</a>
            </form>
        </div>
    );
}