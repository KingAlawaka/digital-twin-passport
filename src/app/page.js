'use client';
import Head from 'next/head'
import styles from '../styles/page.module.css'
import Nav from '@/components/Nav';
import { useState } from 'react';

export default function Home() {
  const [newGreeting, setNewGreeting] = useState('');

  function runTransaction(){
    console.log("Hellow");
    console.log(newGreeting);
  }

  function m2(){
    console.log("bye");
  }

	return (
		<div className={styles.container}>
			<Head>
				<title>Emerald DApp</title>
				<meta name="description" content="Created by Emerald Academy" />
				<link rel="icon" href="https://i.imgur.com/hvNtbgD.png" />
			</Head>

      <Nav />

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to my{' '}
					<a href="https://academy.ecdao.org" target="_blank">
						Emerald DApp!
					</a>
				</h1>
        <input onChange={(e) => setNewGreeting(e.target.value)} placeholder="Hello, Idiots!" />
        
        <p>test p tag</p>
        <button onClick={runTransaction}>Run Transaction</button>
        <button onClick={m2}>button2</button>
			</main>
		</div>
	);
}