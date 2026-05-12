'use client';

import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui/input';

import s from './MessageComposer.module.scss';

type MessageComposerProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSend: () => void;
};

export const MessageComposer = ({ value, onValueChange, onSend }: MessageComposerProps) => {
  return (
    <div className={s.composer}>
      <Input
        type='text'
        placeholder='Write a message...'
        value={value}
        onChange={(e) => onValueChange(e.currentTarget.value)}
      />
      <Button
        type='button'
        variant='text'
        disabled={value.trim().length === 0}
        onClick={onSend}
      >
        Send message
      </Button>
    </div>
  );
};
