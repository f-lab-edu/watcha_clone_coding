import React from 'react';

type ErrorProps = {
  message?: string;
  retry?: () => void;
};

const Loading: React.FC = () => {
  return (
    <div className="status status-loading" role="status" aria-live="polite">
      <div className="spinner" />
      <div className="status-text">로딩중...</div>
    </div>
  );
};

const ErrorState: React.FC<ErrorProps> = ({ message, retry }) => {
  return (
    <div className="status status-error" role="alert" aria-live="assertive">
      <div className="status-title">문제가 발생했어요</div>
      {message && <div className="status-desc">{message}</div>}
      {retry && (
        <button className="status-retry-button" onClick={retry} type="button">
          다시 시도
        </button>
      )}
    </div>
  );
};

const Status = {
  Loading,
  ErrorState,
} as const;

export default Status;
export { Loading, ErrorState };
