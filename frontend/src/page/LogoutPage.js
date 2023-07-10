import {UserCard} from "../components/UserCard";
import rose from "../img/rose2.jpg"
import {useSelector} from "react-redux";
import {Authoritation} from "../components/Authorization";
import React from "react";

export const LogoutPage = () => {
    const isAuthForm = useSelector((state) => state.user.isAuth)
    return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundImage: `url(${rose})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {isAuthForm ? (
                <Authoritation />
            ) : (<UserCard/>)}
    </div>);

}