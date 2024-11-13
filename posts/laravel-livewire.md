---
title: "Build SPA with Laravel livewire and AlpineJs"
subtitle: "Livewire and Alpine"
date: "2024-11-08"
---

**STEPS TO BUILD SIMPLE APP WITH LARAVEL LIVEWIRE**

```
php artisan make:component AppLayout
```

move component/app-layout.blade into new layout directory

rename app-layout.blade to app.blade

```php
//in app/View/Components/appLayout.php
public function render()
{
    return view('layout.app');
}
```

copy everything in welcome.blade into app.blade.php

```html
<!-- app.blade.php -->
<body>
	<div>{{$slot}}</div>
</body>
```

```html
<!-- welcome.blade -->
<x-app-layout>
	<div>some some some</div>
</x-app-layout>
```

**render new component with navigations**

```
artisan make:livewire Collection
```

```php
//web.php
Route::get('/collection', \App\Http\Livewire\Collection::class);
```

```php
//Collection.php
public function render()
{
    return view('livewire.collection') ->layout('layout.app');
}
```

```html
<!-- collection.blade.php -->
<div>Hello Foo! Welcome to the register page!</div>
```

**computed properties**

```php
//computed property name surrounded by get and Property keywords
public function getFirstNameProperty(){
    return 'some';
}

//in blade
{{$firstName}}

//from inherited classes or when property in a trait
use traitName;
dd($this->first_name);
```
