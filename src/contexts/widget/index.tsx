import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from '@/services/socket';

type WidgetContextType = {
  widgets: string[];
  setHash: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const WidgetContext = React.createContext({} as WidgetContextType);

export const WidgetProvider: React.FC = ({ children }) => {
  const { io } = useSocket();
  const [hash, setHash] = useState<string>();

  const [widgets, setWidgets] = useState<string[]>([]);

  useEffect(() => {
    if (!hash) return;

    const event = `from-server.get-widgets:${hash}`;

    const listener = (args: any) => {
      if (!args?.widgets) return;

      setWidgets(args.widgets);
    };

    io.on(event, listener);

    return () => {
      io.off(event, listener);
    };
  }, [io, hash]);

  useEffect(() => {
    if (!hash) return;

    io.emit('from-app-web.get-widgets', { hash });
  }, [hash, io]);

  return (
    <WidgetContext.Provider value={{ widgets, setHash }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidget = () => {
  const { setHash, widgets } = useContext(WidgetContext);

  const isWidgetEnabled = useCallback(
    (widget: string) => {
      return widgets.includes(widget);
    },
    [widgets]
  );

  return { setHash, isWidgetEnabled };
};
