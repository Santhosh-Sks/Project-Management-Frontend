import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import './Auth.css';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);

    return (
        <div className='logicContainer'>
            <div className='box h-[30rem] w-[25rem]'>
                <div className='minContainer login'>
                    <div className='logicBox w-full px-10 space-y-5'>
                        {isSignup ? <Signup /> : <Login />}
                        <div className="text-center">
                            <span>{isSignup ? "Already have an account?" : "Don't have an account?"}</span>
                            <Button variant="ghost" onClick={() => setIsSignup(!isSignup)}>
                                {isSignup ? "Login" : "Sign up"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
