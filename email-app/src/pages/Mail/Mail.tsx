import { FC } from 'react';
import MailContainer from '../../components/Mail/MailContainer';

/**
 * `Mail` acts as a wrapper component for the `MailContainer`. It
 * renders the `MailContainer` component, serving as an entry point for the mail-related features within
 * the application, such as viewing the inbox, sent items, and composing new emails.
 */
const Mail: FC = () => {
  return <MailContainer />;
};

export default Mail;
