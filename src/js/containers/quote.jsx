import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Quote = ({width = 1, height = 1, x = 0, y = 0}) => {
  const [quote, setQuote] = useState(null);

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

  const renderQuote = () => {
    return (
      <>
        <q className="quote__content block">{quote.quote}</q>
        <i className="quote__author block">--{quote.author}--</i>
      </>
    );
  }

  const getStyle = () => {
    return {
      gridColumnStart: x,
      gridColumnEnd: `span ${width}`,
      gridRowStart: y,
      gridRowEnd: `span ${height}`
    };
  }  

  return (
    <div className="quote" style={getStyle()}>
      {!quote && <Icon icon={faSpinner} className="fa-spin" />}
      {quote && renderQuote()}
    </div>
  );
}