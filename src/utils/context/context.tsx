import { createContext, useCallback, useState } from 'react';

type Context = {
  channels: Array<Object>
};

const defaultContext: Context = {
  channels: [],
}

export const GlobalContext = createContext({});

export const GlobalProvider = ({
  children, value
}) => {
    const [channels, setChannelsResult] = useState(value);
    return (
      <GlobalContext.Provider
        value={{
          channels,
          setChannelsResult,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
};
