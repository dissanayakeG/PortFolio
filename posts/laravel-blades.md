---
title: "Getting started with laravel blades"
subtitle: "Blade component as front-end"
date: "2024-11-08"
---

**rendering a view in browser**

```cpp
Route::get('/', function () {
    return view('welcome', ['name' => 'Samantha']);
});
```

**using variables**

```cpp
Hello, {{ $name }}
```

**include php scripts**

```cpp
@php
    $counter = 1;
@endphp
```

**example blade directives**

```cpp
@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don t have any records!
@endif
```

```cpp
@unless (Auth::check())
    You are not signed in.
@endunless
```

```cpp
@isset($records)
    // $records is defined and is not null...
@endisset

@empty($records)
    // $records is "empty"...
@endempty
```

```cpp
@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest
```

```cpp
@auth('admin')
    // The user is authenticated...
@endauth

@guest('admin')
    // The user is not authenticated...
@endguest
```

```cpp
@production
    // Production specific content...
@endproduction
```

```cpp
@env('staging')
    // The application is running in "staging"...
@endenv

@env(['staging', 'production'])
    // The application is running in "staging" or "production"...
@endenv
```

```cpp
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

**LOOPS**

```cpp
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

**Conditional Classes**

```cpp
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
