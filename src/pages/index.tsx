'use client'

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { registerUser } from "utils/registry";
import '../styles/Home.scss';
import Image from "next/image";
import { Button } from "@components/Button/Button";
import { useTheme } from "hooks/useTheme";

export default function HomePage() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const getTitleImg = useMemo(() => {
    return theme.themeTitle === 'light' ? '/images/DOODLYDO_light.svg' : '/images/DOODLYDO.svg'
  }, [theme]);

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    registerUser(nickname)
        .then(() => router.push('/board'))
        .catch((error) => error.message);
  }
  
  return (
    <div className="home-page page">
      <div className="home-page__container container">
        <div className="home-page__login-block">
          <div className="home-page__title">
            <Image src={getTitleImg} width={539} height={412} alt='doodly-do'/>
          </div>
        <form className='home-page__form form' onSubmit={handleLogIn}>
          <input
            name='nickname'
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Enter your nickname"
            className="form__input input"
          />
          <Button type='submit' text='Log In' />
        
          </form>
          </div>
      </div>
    </div>
  );
}
