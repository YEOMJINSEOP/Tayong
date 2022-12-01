import React from 'react'
import Chat from './Chat/Chat'
import Info from './Info/Info'
import Member from './Member/Member'
import styles from './ParticipateComponent.module.css'

export default function ParticipateComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.containertwo}>
            <div className={styles.leftcontainer}>
                <div className={styles.top}>
                    <Member/>
                </div>

                <div className={styles.bottom}>
                    <Info/>
                </div>
            </div>
            <div className={styles.rightcontainer}>
                 <Chat/>
            </div>
            </div>
            
        </div>
    )
}
