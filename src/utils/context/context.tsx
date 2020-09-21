import { createContext, useCallback, useState } from 'react';

type Context = {
  targetChannel: Object
};

const defaultContext: Context = {
  targetChannel: [],
}

export const GlobalContext = createContext({});

export const GlobalProvider = ({
  children, value
}) => {
    const [targetChannel, setTargetChannel] = useState(value);
    return (
      <GlobalContext.Provider
        value={{
          targetChannel,
          setTargetChannel,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
};
