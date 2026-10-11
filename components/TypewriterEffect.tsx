'use client';

import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  words: string[];
  speed?: number;
  delay?: number;
}

export default function TypewriterEffect({
  words,
  speed = 100,
  delay = 500,
}: TypewriterEffectProps) {
  const [displayedWord, setDisplayedWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setDisplayedWord(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
          setTimeout(() => { }, delay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedWord(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, wordIndex, isDeleting, words, speed, delay]);

  return (
    <span className="font-semibold text-slate-900 dark:text-white">
      {displayedWord}
      <span className="animate-pulse">|</span>
    </span>
  );
}
