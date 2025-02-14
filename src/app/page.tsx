'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

interface CounterResponse {
  count: number;
  message: string;
}

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchCounter = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/counter`);
      const data: CounterResponse = await response.json();
      setCount(data.count);
      setMessage(data.message);
    } catch (error) {
      setMessage(`Error fetching counter: ${error}`);
    }
  };

  const incrementCounter = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/counter/increment`, {
        method: 'POST',
      });
      const data: CounterResponse = await response.json();
      setCount(data.count);
      setMessage(data.message);
    } catch (error) {
      setMessage(`Error incrementing counter: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="flex flex-col items-center space-y-6 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold">Counter Demo</h2>
          
          <div className="text-4xl font-semibold">
            {count !== null ? count : 'Loading...'}
          </div>
          
          <button
            onClick={incrementCounter}
            disabled={loading}
            className={`px-6 py-3 rounded-full text-white transition-colors ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Incrementing...' : 'Increment Counter'}
          </button>
          
          {message && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          )}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Next.js Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://fastapi.tiangolo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          FastAPI Docs
        </a>
      </footer>
    </div>
  );
}
