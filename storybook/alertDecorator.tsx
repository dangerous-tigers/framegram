import { AlertProvider } from '@/shared/ui/alert/AlertProvider';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { Decorator } from '@storybook/react';

type AlertDecoratorState = Omit<ReturnType<typeof useAlertStore.getState>, 'show' | 'hide'>;

export const alertDecorator =
  (state: Partial<AlertDecoratorState> = {}): Decorator =>
  (Story) => {
    useAlertStore.setState({
      ...state,
    });

    return (
      <AlertProvider isStories={true}>
        <Story />
      </AlertProvider>
    );
  };
