import { createContext, useCallback, useState } from 'react';

type Context = {
  channel: Object
};

const defaultContext: Context = {
  channel: [],
}

export const GlobalContext = createContext({});

export const GlobalProvider = ({
  children, value
}) => {
    const [channel, setTargetChannel] = useState(value);
    return (
      <GlobalContext.Provider
        value={{
          channel,
          setTargetChannel,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
};
