import userEvent from "@testing-library/user-event";
import NewMessageForm from "./NewMessageForm"
import {render, screen} from '@testing-library/react';

describe('<NewMessageForm />', () => { // just testing this component, unlike cypress tests
    describe('Clicking the send button', () => {
        let sendHandler;
        async function sendMessage() {
            sendHandler = jest.fn().mockName('sendHandler');

            render(<NewMessageForm onSend={sendHandler} />);

            await userEvent.type(
                screen.getByTestId('messageText'),
                'New message',
            );
            userEvent.click(screen.getByTestId('sendButton'));
        }
        it('Clears the text field', async () => {
            await sendMessage();
            expect(screen.getByTestId('messageText').value).toEqual('');
        });
        it('Calls the send handler', async() => {
            await sendMessage();
            expect(sendHandler).toHaveBeenCalledWith('New message');
        });
    });
});