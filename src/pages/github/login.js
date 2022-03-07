import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import GitHubLoginLink from '../../components/GitHubLoginLink';

export default function GitHubLogin() {
  const router = useRouter();
  const [ error, setError ] = useState("");

  useEffect(() => {
    async function exchangeForAccessToken(code) {
      const res = await fetch('/api/tokenExchange', {
        method: 'POST',
        body: JSON.stringify({
          code: code
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resBody = await res.json();
      if (res.status !== 200) {
        setError(resBody.err)
      } else {
        console.log("== Auth succeeded!");
      }
    }
    if (router.query.code) {
      exchangeForAccessToken(router.query.code);
    }
  }, [ router.query.code ]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <GitHubLoginLink />
    </div>
  );
}
