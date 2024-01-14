import { useState, useEffect } from 'react';

const QuoteComponent = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/Data/quotes.json',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const quotes = await response.json();
        let randomIndex = Math.floor(Math.random() * quotes.length);
        while (quotes[randomIndex].en.length > 200) {
          randomIndex = Math.floor(Math.random() * quotes.length);
        }
        setQuote(quotes[randomIndex].en);
        setAuthor(quotes[randomIndex].author);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <blockquote className='quote'>
          <h1 className='dark:text-white '>{quote}</h1>
          <p className='author'>- {author}</p>
        </blockquote>
      )}
      <style jsx>{`
        .quote {
          border: 1px solid; /* Use inline style for border color */
          border-radius: 10px;
          padding: 20px;
          position: absolute;
          top: 90px;
          right: 20px;
          font-family: 'Times New Roman', serif; /* Use a serif font */
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .quote-inline {
          font-size: 2rem;
          margin: 0;
        }
        .quote-bottom {
          margin-top: auto;
        }
        .author {
          font-style: italic;
          margin-top: 5px;
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
        }

        @media (max-width: 767px) {
          .quote {
            margin: 10px auto 0; /* Top margin added */
            max-width: 80%; /* Adjust the width for center alignment */
            right: initial;
            top: 90px; /* Adjust the top spacing */
          }
        }

        @media (min-width: 768px) {
          .quote {
            position: absolute;
            top: 90px;
            right: 20px;
            max-width: 30%;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteComponent;
