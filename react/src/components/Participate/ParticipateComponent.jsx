import React from 'react';
import Chat from './Chat/Chat';
import Info from './Info/Info';
import Member from './Member/Member';
import styles from './ParticipateComponent.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './Chat/SignIn';
import { auth } from './firebase';

export default function ParticipateComponent() {
    const [user] = useAuthState(auth)
    return (
        <div className={styles.container}>
            <div className={styles.containertwo}>
                <div className={styles.leftcontainer}>
                    <div className={styles.top}>
                        <Member />
                    </div>

                    <div className={styles.bottom}>
                        <Info />
                    </div>
                </div>
                <div className={styles.rightcontainer}>
                    {user ? <Chat /> : <SignIn />}
                </div>
            </div>

        </div>
    );
};
