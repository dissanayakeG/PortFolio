---
title: "Laravel 12 Blade Templates"
subtitle: "Modern Blade Components and Best Practices"
date: "2025-03-19"
tags: "#Laravel, #BladeComponents"
---

# Laravel 12 Blade Templates Guide

![Laravel Logo](/skills/laravel.svg)

## Introduction

Laravel Blade is a powerful templating engine that provides an elegant syntax while compiling to pure PHP. This guide covers Laravel 12's Blade features and best practices.

## Basic Usage

### Rendering Views

```php
// Basic view rendering
Route::get('/', function () {
    return view('welcome', ['name' => 'Samantha']);
});

// With route model binding
Route::get('/users/{user}', function (User $user) {
    return view('users.profile', compact('user'));
});
```

### Template Syntax

#### Variables and Escaping

```php
{{-- Safe, escaped output --}}
<h1>Hello, {{ $name }}</h1>

{{-- Raw, unescaped HTML (use with caution) --}}
<div>{!! $htmlContent !!}</div>

{{-- PHP blocks --}}
@php
    $counter = 1;
    $items = collect(['one', 'two', 'three']);
@endphp
```

## Control Structures

### Conditionals

```php
{{-- If Statements --}}
@if ($user->isAdmin())
    <admin-badge/>
@elseif ($user->isModerator())
    <mod-badge/>
@else
    <user-badge/>
@endif

{{-- Unless Statement --}}
@unless (Auth::check())
    <p>Please log in</p>
@endunless

{{-- New in Laravel 12: match statements --}}
@match($role)
    @case('admin')
        <admin-panel/>
        @break
    @case('user')
        <user-dashboard/>
        @break
    @default
        <guest-view/>
@endmatch
```

### Authentication Checks

```php
@auth('admin')
    <admin-dashboard/>
@elseguest
    <login-form/>
@endauth

@guest
    <p>Welcome, please login</p>
@endguest
```

### Environment Checks

```php
@production
    <!-- Production Analytics -->
    <script src="analytics.js"></script>
@endproduction

@env(['local', 'staging'])
    <dev-toolbar/>
@endenv
```

## Loops and Iterations

### Basic Loops

```php
@foreach ($users as $user)
    <user-card :user="{{ $user }}"/>
@empty
    <p>No users found.</p>
@endforeach

{{-- Loop with index --}}
@for ($i = 0; $i < count($items); $i++)
    <span>Item {{ $i + 1 }}: {{ $items[$i] }}</span>
@endfor
```

### Loop Variables

```php
@foreach ($users as $user)
    {{-- Available properties --}}
    {{ $loop->index }}      {{-- 0 based --}}
    {{ $loop->iteration }} {{-- 1 based --}}
    {{ $loop->remaining }}
    {{ $loop->count }}
    {{ $loop->first }}
    {{ $loop->last }}
    {{ $loop->even }}
    {{ $loop->odd }}
    {{ $loop->depth }}

    {{-- Nested Loops --}}
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            <span>First user's post</span>
        @endif
    @endforeach
@endforeach
```

## Modern Blade Components

### Class Components

```php
{{-- Dynamic Classes --}}
<div @class([
    'base-class',
    'active' => $isActive,
    'disabled' => $isDisabled,
    'error' => $errors->has('field')
])>
    Content
</div>
```

### Anonymous Components

```php
{{-- resources/views/components/alert.blade.php --}}
<x-alert type="error" :message="$message"/>

{{-- With slots --}}
<x-card>
    <x-slot:title>
        Dashboard
    </x-slot>

    <x-slot:content>
        Main content here
    </x-slot>
</x-card>
```

### Style and Script Components (New in Laravel 12)

```php
{{-- Inline styles --}}
<x-style>
    .custom-element {
        background: theme('colors.primary');
    }
</x-style>

{{-- Inline scripts --}}
<x-script>
    function initializeComponent() {
        // Component logic
    }
</x-script>
```

## Best Practices

1. **Use Components Over Includes**

```php
{{-- Prefer this --}}
<x-user-profile :user="$user"/>

{{-- Over this --}}
@include('partials.user-profile', ['user' => $user])
```

2. **Leverage View Models**

```php
class UserProfileViewModel
{
    public function __construct(public User $user)
    {}

    public function fullName(): string
    {
        return "{$this->user->first_name} {$this->user->last_name}";
    }
}
```

3. **Use Blade Directives for Complex Logic**

```php
{{-- AppServiceProvider.php --}}
Blade::directive('datetime', function ($expression) {
    return "<?php echo Carbon\Carbon::parse($expression)->format('Y-m-d H:i'); ?>";
});

{{-- In template --}}
<span>Posted: @datetime($post->created_at)</span>
```

## Security Considerations

1. Always escape user input using `{{ }}`
2. Use `@csrf` in forms
3. Validate data before displaying
4. Use middleware for authentication checks

## Performance Tips

1. Cache your views in production
2. Use view composers for repeated data
3. Implement lazy loading for heavy components
4. Use pagination for large datasets

For more information, visit the [Laravel 12 Documentation](https://laravel.com/docs).
