import {
  PrintLog as PrintLogCore,
  PrintLogProxy as PrintLogProxyCore,
  IPrintLogOptions,
} from './core/PrintLogger';

export const PrintLog = ({
  Logger = NodeLogger,
  ...options
}: IPrintLogOptions = {}) => PrintLogCore({ Logger, ...options });

export const PrintLogProxy = PrintLogProxyCore({
  Logger: NodeLogger,
});
