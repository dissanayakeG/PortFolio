const markdownOptions = {
    overrides: {
        h1: { component: 'h1', props: { className: 'text-2xl font-bold' } },
        h2: { component: 'h2', props: { className: 'text-xl font-semibold' } },
        ul: { component: 'ul', props: { className: 'list-disc list-inside' } },
    },
};

export default markdownOptions;
