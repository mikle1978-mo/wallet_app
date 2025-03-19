"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import MyButton from "@/components/UI/buttons/MyButton";
import MyInput from "@/components/UI/inputs/MyInput";
import MySwitcher from "@/components/UI/switchers/MySwitcher";
import ArrowBack from "@/components/UI/arrows/arrow_back";

export default function Onboarding3() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            requestAnimationFrame(() => {
                router.push("/backup-phrase");
            });
        }, 2000);
    };
    return (
        <>
            <div className={`header ${styles.header_special}`}></div>
            <div className={styles.arrow_wrapper}>
                <ArrowBack />
            </div>
            <div className={`main ${styles.main_special}`}>
                <div className='container'>
                    <div className={styles.main_wrapper}>
                        <h1>Create a Password</h1>
                        <p>
                            Now that you’ve created your wallet, Lets secure it!
                        </p>
                        <form
                            id='myForm'
                            className={styles.form}
                            onSubmit={handleSubmit}
                        >
                            <MyInput
                                id='password_enter'
                                placeholder='Enter a password'
                            />
                            {/* <MyInput
                                id='password_confirm'
                                placeholder='Confirm password'
                            /> */}
                            <div className={styles.faceId}>
                                <Image
                                    src='/faceId.svg'
                                    alt='image'
                                    width={32}
                                    height={32}
                                />
                                <p>Sign in with face ID?</p>
                                <MySwitcher />
                            </div>
                        </form>{" "}
                        <div className={styles.btn_wrapper}>
                            <MyButton type='submit' form='myForm'>
                                Create password
                            </MyButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`footer ${styles.footer_top}`}>
                <div className={styles.footer_wrapper}></div>
            </div>
        </>
    );
}
