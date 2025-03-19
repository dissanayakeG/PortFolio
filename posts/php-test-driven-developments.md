---
title: "PHPUnit testing"
subtitle: "First step into PHPUnit testing"
date: "2024-11-08"
tags: "#PHPUnit, #PHP, #TDD"
---

# First step into PHPUnit testing

-   Create an empty directory
-   Open the created directory in a text editor or in an IDE
-   Goto <i class="text-secondary-light">
    <a href="https://packagist.org">https://packagist.org</a></i> and search <i class="text-secondary-light">phpunit</i>

<i class="text-secondary-light">
<a href="https://packagist.org/packages/phpunit/phpunit">(https://packagist.org/packages/phpunit/phpunit)</a></i>
<br/>
<br/>

-   Open the terminal from created project and run
    <i class="text-secondary-light">composer require --dev phpunit/phpunit</i>

**NOTE:** Test file names must end with <i class="text-secondary-light">
Test</i>, and test cases must begin with <i class="text-secondary-light">
test</i> or should be anotated like <i class="text-secondary-light">
/\*_ @test _/</i>

<br/>
-   Create a test file <i class="text-secondary-light">
    tests\ExampleTest.php</i>

```php
//tests/ExampleTest.php
<?php
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testTwoStringsAreTheSame()
    {
        $string1 = 'Hello';
        $string2 = 'Hello';
        $this->assertSame($string1, $string2);
    }
}
```

#### Use below commands to execute test cases

-   To execute specific test case
    <i class="text-secondary-light">php vendor/bin/phpunit tests/ExampleTest.php</i>
-   To get the coverage report <i class="text-secondary-light">php vendor/bin/phpunit --coverage-text</i>
-   To execute specific test case with additional details
    <i class="text-secondary-light">php vendor/bin/phpunit tests/ExampleTest.php --colors
    php vendor/bin/phpunit tests/ExampleTest.php --colors --testdox</i>
-   We can execute all the test cases in **tests** directory by
    <i class="text-secondary-light">php vendor/bin/phpunit tests/</i>

<br/>

#### Optimizing Your PhpUnit Testing with a Custom Configuration File

Efficiently managing PhpUnit testing configurations can significantly enhance the testing process. One way to streamline this is by creating a dedicated configuration file in the .xml format.

<br/>

To get started, you'll want to create a
<i class="text-secondary-light">phpunit.xml file in your project's root directory<i>.

```xml
//phpunit.xml
<?xml version="1.0" encoding="UTF-8"?>

<phpunit colors="true">

    <testsuites>
        <testsuite name="Tests">
            <directory>tests</directory>
        </testsuite>
    </testsuites>

</phpunit>

```

<br/>
This configuration file serves as a centralized hub for all your PhpUnit settings, allowing for a more organized and efficient testing environment. Customize it to fit your project's specific needs, making testing a seamless part of your development workflow.
<br/>
Now you can execute all the test cases inside test directory by
<i class="text-secondary-light">php vendor/bin/phpunit</i>

<br/>

### There are 3 parts of a test case

<br/>

**1. Setup:**
In this process, you set up the initial test settings and prepare the environment.

-   Construct any necessary objects
-   Initialize variables
    etc.
    <br/>
    <br/>

**2. Do something:**
In this phase the code you want to test will be executed.This stage involves calling methods or carrying out operations on the setup-phase-prepared objects.Here, you replicate the use of your code in the actual world and collect data for eventual use in assertions.

<br/>

**3. Assertion:**
In this phase, you compare the actual outcomes of the "do something" phase with the anticipated results during the assertion step. There are a variety of assertion methods that PHPUnit provides to verify that the behaviour of your code adheres to your expectations.

<br/>

**Note:**
The application is typically bootstrapped in PHPUnit prior to running any test cases. Thus, the test cases are isolated from one another.

<br/>

The environment is created during the bootstrapping process by initialising objects, loading configurations, and gathering any resources the tests may require.

<br/>

You can perform the necessary setup processes using PHPUnit's
<i class="text-secondary-light">setUp()</i> method, which is automatically called before each test case runs in that class. To similarly clean away any resources or carry out actions after each test case, use the
<i class="text-secondary-light">tearDown()</i> function.

<br/>

**Let's write a test case for a php class**

Create <i class="text-secondary-light">Cart.php</i> class in the
<i class="text-secondary-light">src/</i> directory

```php
//src/Cart.php
<?php

class Cart
{
    public float $price;
    public static float $tax = 1.2;

    public function getNetPrice()
    {
        return $this->price * self::$tax;
    }
}

```

<br/>

Now let's write a test case for
<i class="text-secondary-light">getNetPrice()</i> function

Create <i class="text-secondary-light">CartTest.php</i> class in the
<i class="text-secondary-light">tests/</i> directory

```php
//tests/CartTest.php
<?php

use PHPUnit\Framework\TestCase;

class CartTest extends TestCase
{
    protected $cart;

    protected function setUp(): void
    {
        parent::setUp();
        require './src/Cart.php';
        $this->cart = new Cart();
    }

    public function testNetPriceIsCalculatedCorrectly()
    {
        //setup
        //setUp() method called automatically
        $this->cart->price = 10;

        //do something
        $netPrice = $this->cart->getNetPrice();

        //assertion
        $this->assertEquals(12, $netPrice);
    }
}

```

<br/>

**Maximizing Code Reusability with PhpUnit's setUp()**

The <i class="text-secondary-light">setUp()</i> method in PhpUnit is a powerful asset, automatically executed before each test case. It's the perfect spot for housing reusable code, ensuring consistent preparation for every test. Leverage this feature to streamline your testing process and keep your test cases concise and focused.
<br/>
There are additional aspects of unit testing, such as mocking, to cover.Yet, this will be useful to developers wishing to begin test-driven development.
