import MessageBus from '$lib/bus/MessageBus';
import { Messages } from '$lib/bus/Messages';

export enum ToastVariant {
	info,
	warning,
	error,
	success
}

export type ToastConfig = {
	message: string;
	variant?: ToastVariant;
};

export default class ToastService {
	AddToast(config: ToastConfig) {
		let toasts = this.getCurrentToasts();

		if (!config.variant) config.variant = ToastVariant.info;

		MessageBus.sendMessage(Messages.Toasts, [...toasts, config]);
	}

	RemoveToast(index: number) {
		let toasts = this.getCurrentToasts();

		toasts.splice(index, 1);

		MessageBus.sendMessage(Messages.Toasts, toasts);
	}

	private getCurrentToasts(): ToastConfig[] {
		let toasts = MessageBus.getLastMessage<ToastConfig[]>(Messages.Toasts);

		return toasts ?? [];
	}
}
