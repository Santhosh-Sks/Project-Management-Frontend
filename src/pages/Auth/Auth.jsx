import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Button } from '@/components/ui/button';
import './Auth.css';

const Auth = () => {
    const [active, setActive] = useState(true); 
    const handleSignupSuccess = () => {
        setActive(false); 
    };

    return (
        <div className="logicContainer">
            <div className="box h-[30rem] w-[25rem]">
                <div className="minContainer login">
                    <div className="logicBox w-full px-10 space-y-5">
                        {active ? <Signup key="signup" onSignupSuccess={handleSignupSuccess} /> : <Login key="login" />}
                        <div className="text-center">
                            <span>{active ? "Already have an account?" : "Don't have an account?"}</span>
                            <Button variant="ghost" className="ml-2" onClick={() => setActive(!active)}>
                                {active ? "Login" : "Sign Up"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
