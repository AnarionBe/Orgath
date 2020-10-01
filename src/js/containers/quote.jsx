import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {useGrid} from '../hooks/index'

export const Quote = ({coords}) => {
  const [quote, setQuote] = useState(null);
  const displayStyle = useGrid(coords);

  useEffect(() => {
    const fecthQuote = async () => {
      let timeoutId = null;
      const {data} = await axios.get('https://quotes.rest/qod', {
        params: {
          language: 'en'
        }
      });

      setQuote(data.contents.quotes[0]);
      timeoutId = setTimeout(fecthQuote, 3600000);
    }

    fecthQuote();

    return (() => {
      clearTimeout(timeoutId);
    });
  }, []);

  return (
    <div className="quote" style={displayStyle}>
      {!quote && <Icon icon={faSpinner} className="fa-spin" />}
      {quote && (
        <>
          <q className="quote__content block">{quote.quote}</q>
          <i className="quote__author block">--{quote.author}--</i>
        </>
      )}
    </div>
  );
}