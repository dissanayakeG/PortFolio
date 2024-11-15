---
title: "Code format fixer for Laravel/PHP"
subtitle: "How to add code format fixer in your Laravel/PHP project"
date: "2024-11-08"
---

# Code format fixer for Laravel/PHP

<br>
In this post we are going to talk about adding
<i class="text-secondary-light">PhpCsFixer</i> for your Laravel/PHP project.<br>
<i class="text-secondary-light">PhpCsFixer</i> is a tool that can automatically fix coding style issues in your PHP codebase.
<br>
<br>
Follow below steps to setup the <i class="text-secondary-light">PhpCsFixer</i> in your project.

-   <i class="text-secondary-light">Install PhpCsFixer</i><br>

Open your terminal and navigate to your Laravel project's root directory.<br>
Then, install php-cs-fixer as a development dependency using Composer by running

<i class="text-secondary-light">composer require --dev friendsofphp/php-cs-fixer</i>

-   <i class="text-secondary-light">Create a Configuration File</i><br>

create <i class="text-secondary-light"><i class="text-secondary-light">.php-cs-fixer.php</i></i> file in your root directory and paste below

```php
<?php

$rules = [
    '@Symfony' => true,
    'no_mixed_echo_print' => true,
    'phpdoc_no_empty_return' => false,
    'array_syntax' => ['syntax' => 'short'],
    'no_multiline_whitespace_around_double_arrow' => true,
    'no_trailing_comma_in_singleline_array' => true,
    'trim_array_spaces' => true,
    'normalize_index_brace' => true,
    'yoda_style' => false,
    'concat_space' => ['spacing' => 'one'],
    'not_operator_with_space' => false,
    'increment_style' => ['style' => 'post'],
    'php_unit_method_casing' => ['case' => 'snake_case'],
    'phpdoc_no_alias_tag' => false,
    'global_namespace_import' => [
        'import_classes' => true,
        'import_constants' => true,
    ],
    'phpdoc_align' => [
        'align' => 'vertical',
        'tags' => [
            'param',
            'property',
            'property-read',
            'property-write',
            'return',
            'throws',
            'type',
            'var',
            'method',
        ],
    ],
];

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/app',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/resources',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ]);

$config = new PhpCsFixer\Config();
return $config->setRules([
    '@PSR12' => true,
    'array_syntax' => ['syntax' => 'short'],
    // Add more rules as needed
])
    ->setFinder($finder);

    or

return (new PhpCsFixer\Config())
    ->setUsingCache(true)
    ->setRules($rules)
    ->setFinder($finder);
```

<br>

This option instructs PhpCsFixer to adhere to the PSR-12 coding standard and run on the specified directories<br>
(you can modify these to match the organisational structure of your project). The rules can be altered to adhere to your preferred coding standards.<br><br>

-   <i class="text-secondary-light">Adding composer script</i><br>

add a script to your composer.json file like<br>

```php
"scripts": {
    "cs-fix": "vendor/bin/php-cs-fixer fix"
}
```

Now you can run <i class="text-secondary-light">composer cs-fix</i> in the terminal to run PhpCsFixer<br><br>

-   <i class="text-secondary-light">Run PhpCsFixer directly</i><br>

you can run PhpCsFixer without adding script in
<i class="text-secondary-light"> composer.json</i><br>

<i class="text-secondary-light">vendor/bin/php-cs-fixer fix</i><br>

-   <i class="text-secondary-light">Integration with Laravel Forge (Optional) </i><br>

If you're using Laravel Forge to deploy your application, you can configure the "Post-Deployment Script" to run PhpCsFixer after each deployment.<br>

Remember to adjust the paths, rules, and settings in the configuration file to match your project's needs.
