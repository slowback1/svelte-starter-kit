<script lang="ts">
  export let testId: string = "";
  type ButtonVariant = "primary" | "secondary" | "text";
  type ButtonSize = "small" | "medium" | "large";
  export let variant: ButtonVariant = "primary";
  export let size: ButtonSize = "medium";
  export let href: string = undefined;
  export let disabled: boolean = false;
  export let tabIndex: number = 0;
  export let onClick: (event: Event) => void = () => {
  };

  const isSecondary = variant === "secondary";
  const isPrimary = variant === "primary";
  const isText = variant === "text";

  const isSmall = size === "small";
  const isLarge = size === "large";

  const tag = !!href ? "a" : "button";
  const role = tag === "a" ? "link": "button";
</script>

<svelte:element this={tag}
                class="button"
                class:button-large={isLarge}
                class:button-small={isSmall}
                class:button-primary={isPrimary}
                class:button-secondary={isSecondary}
                class:button-text={isText}
                {href}
                on:click={onClick}
                disabled="{disabled}"
                data-testid={testId}
                role={role}
                tabIndex="{tabIndex}"
                >
  <slot />
</svelte:element>

<style>
    .button {
        border-radius: 4px;
        border: 1px solid;
        padding: 8px 16px;
        text-decoration: none;
        font-family: var(--font-family-primary);
        font-size: var(--font-size-medium);
        transition: background-color 0.5s ease-in-out;
    }

    .button:hover {
        cursor: pointer;
    }

    .button:disabled {
      opacity: 0.5;
    }

    .button-small {
        padding: 4px 8px;
        font-size: var(--font-size-small);
    }

    .button-large {
        padding: 12px 24px;
    }

    .button-primary {
        background-color: var(--color-yale-blue);
        color: var(--color-nyanza);
        border-color: var(--color-nyanza);
    }

    .button-primary:hover, .button-primary:focus {
        background-color: var(--color-yale-blue-highlight);
    }

    .button-secondary {
        background-color: transparent;
        color: var(--color-nyanza);
        border-color: var(--color-nyanza);
    }

    .button-secondary:hover, .button-secondary:focus {
        background-color: var(--color-nyanza);
        color: var(--color-rich-blue);
    }

    .button-text {
        background-color: transparent;
        color: var(--color-rich-blue);
        border-color: transparent;
    }

    .button-text:hover, .button-text:focus {
        background-color: var(--color-rich-blue);
        color: var(--color-font-light);
    }
</style>