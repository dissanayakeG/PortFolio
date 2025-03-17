---
title: "Laravel blades"
subtitle: "Blade component as front-end"
date: "2024-11-08"
tags: "#Laravel, #PHP"
---

# Laravel blades

<br>
![Alt text](/skills/laravel.svg)

#### Rendering a view in browser

```php
Route::get('/', function () {
    return view('welcome', ['name' => 'Samantha']);
});
```

#### Using variables in blades

```php
Hello, {{ $name }}
```

#### Include php scripts

```php
@php
    $counter = 1;
@endphp
```

#### Example blade directives

```php
@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don t have any records!
@endif
```

```php
@unless (Auth::check())
    You are not signed in.
@endunless
```

```php
@isset($records)
    // $records is defined and is not null...
@endisset

@empty($records)
    // $records is "empty"...
@endempty
```

```php
@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest
```

```php
@auth('admin')
    // The user is authenticated...
@endauth

@guest('admin')
    // The user is not authenticated...
@endguest
```

```php
@production
    // Production specific content...
@endproduction
```

```php
@env('staging')
    // The application is running in "staging"...
@endenv

@env(['staging', 'production'])
    // The application is running in "staging" or "production"...
@endenv
```

```php
@switch($i)
    @case(1)
        First case...
        @break

    @case(2)
        Second case...
        @break

    @default
        Default case...
@endswitch
```

#### Loops

```php
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
    <div>This is user {{ $user->id }}</div>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <div>No users</div>
@endforelse

@while (true)
    <div>I am looping forever.</div>
@endwhile

loop variables avalable

@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            This is the first iteration of the parent loop.
        @endif
    @endforeach
@endforeach

$loop->index/iteration/remaining/count/first/last/even/odd/depth/parent
```

#### Conditional Classes

```php
@php
    $isActive = false;
    $hasError = true;
@endphp

<span @class([
    'p-4',
    'font-bold' => $isActive,
    'text-gray-500' => ! $isActive,
    'bg-red' => $hasError,
])></span>

<span class="p-4 text-gray-500 bg-red"></span>
```
