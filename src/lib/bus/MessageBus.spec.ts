import MessageBus from '$lib/bus/MessageBus';
import type IStorageProvider from './IStorageProvider';
import getLocalStorageMock from "$lib/testHelpers/localStorageMock";

describe('MessageBus', () => {
	let storageProvider: IStorageProvider;

	beforeEach(() => {
		storageProvider = getLocalStorageMock();

		MessageBus.initialize(storageProvider);
	});

	it('can subscribe to a message', () => {
		let unsubscribe = MessageBus.subscribe('test_message', (value) => {});

		expect(unsubscribe).toBeDefined();
		expect(unsubscribe).toBeTypeOf('function');
	});

	it('can send a message to the bus', () => {
		MessageBus.sendMessage('test_message', 'value');
	});

	it('sending a message to the bus notifies subscribers', () => {
		let receivedValue = '';

		MessageBus.subscribe('test_message', (value) => (receivedValue = value));

		MessageBus.sendMessage('test_message', 'hello world');

		expect(receivedValue).toEqual('hello world');
	});

	it('after unsubscribing from a message, the subscriber callback no longer gets called', () => {
		let receivedValue = '';

		let unsubscribe = MessageBus.subscribe('test_message', (value) => (receivedValue = value));

		MessageBus.sendMessage('test_message', 'hello world');

		unsubscribe();

		MessageBus.sendMessage('test_message', 'goodbye world');

		expect(receivedValue).toEqual('hello world');
	});

	it('can clear a message', () => {
		let receivedValue = '';

		let unsubscribe = MessageBus.subscribe('test_message', (value) => (receivedValue = value));

		MessageBus.sendMessage('test_message', 'hello world');

		MessageBus.clear('test_message');

		expect(receivedValue).toEqual(null);
	});

	it('when sending messages, stores the last message in the given IStorageProvider', () => {
		MessageBus.sendMessage('test_message', 'hello world');

		let storedValue = storageProvider.getItem('test_message');

		expect(storedValue).toEqual('hello world');
	});

	it('when initializing the message bus, sends out messages for all of the stored items', () => {
		storageProvider.setItem('test_message', 'hello world');

		let receivedValue = '';

		MessageBus.subscribe('test_message', (value) => (receivedValue = value));

		MessageBus.initialize(storageProvider);

		expect(receivedValue).toEqual('hello world');
	});

	it('when subscribing to the message bus, calls the callback function with the current stored value', () => {
		MessageBus.sendMessage('test_message', 'value');

		let receivedValue = '';

		MessageBus.subscribe('test_message', (value) => (receivedValue = value));

		expect(receivedValue).toEqual('value');
	});

	it('can get the most recently published message', () => {
		MessageBus.sendMessage('test_message', 'value');

		let value = MessageBus.getLastMessage('test_message');

		expect(value).toEqual('value');
	});

	it('setting a non-string message stringifies it in the storage provider', () => {
		MessageBus.sendMessage('test_message', { name: 'value' });

		let storedValue = storageProvider.getItem('test_message');

		expect(storedValue).toEqual(JSON.stringify({ name: 'value' }));
	});

	it('parses the JSON of stored values when initializing', () => {
		storageProvider.setItem('message', JSON.stringify({ name: 'value' }));

		MessageBus.initialize(storageProvider);

		let value = MessageBus.getLastMessage('message');

		expect(value).toBeTypeOf('object');
		expect(value.name).toEqual('value');
	});

	it('can clear all of the data in the message bus', () => {
		MessageBus.sendMessage('message_1', 'value');
		MessageBus.sendMessage('message_2', 'value 2');

		MessageBus.clearAll();

		let firstValue = MessageBus.getLastMessage('message_1');
		let secondValue = MessageBus.getLastMessage('message_2');

		expect(firstValue).toEqual(null);
		expect(secondValue).toEqual(null);
	});
});
