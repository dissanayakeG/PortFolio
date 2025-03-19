---
title: "PHP TDD (Test driven developments) -2"
subtitle: "Mocks and Stubs"
date: "2024-11-08"
tags: "#PHPUnit, #PHP, #TDD, #Mocks"
---

# Mocks and Stubs

<br>
The <i class="text-secondary-light">createStub($type)</i> and <i class="text-secondary-light">createMock($type)</i> methods immediately return a test double object for the specified type (interface or class).

The <i class="text-secondary-light">**construct()</i> and <i class="text-secondary-light">**clone()</i> methods of the original class are not executed and the arguments passed to a method of the test double will not be cloned.

note that final, private, and static methods cannot be stubbed or mocked

### STUBBING

The practice of replacing an object with a test double that (optionally) returns configured return values is referred to as stubbing

```php
use PHPUnit\Framework\TestCase;

final class StubTest extends TestCase
{
    public function testStub(): void
    {
        // Create a stub for the SomeClass class.
        $stub = $this->createStub(SomeClass::class);

        // Configure the stub.
        $stub->method('doSomething')
             ->willReturn('foo');

        // Calling $stub->doSomething() will now return
        // 'foo'.
        $this->assertSame('foo', $stub->doSomething());
    }

    public function testReturnArgumentStub(): void
    {
        // Create a stub for the SomeClass class.
        $stub = $this->createStub(SomeClass::class);

        // Configure the stub.
        $stub->method('doSomething')
             ->will($this->returnArgument(0));

        // $stub->doSomething('foo') returns 'foo'
        $this->assertSame('foo', $stub->doSomething('foo'));

        // $stub->doSomething('bar') returns 'bar'
        $this->assertSame('bar', $stub->doSomething('bar'));
    }

    public function testReturnSelf(): void
    {
        // Create a stub for the SomeClass class.
        $stub = $this->createStub(SomeClass::class);

        // Configure the stub.
        $stub->method('doSomething')
             ->will($this->returnSelf());

        // $stub->doSomething() returns $stub
        $this->assertSame($stub, $stub->doSomething());
    }
}
```

<i class="text-secondary-light">_“Behind the scenes”, PHPUnit automatically generates a new PHP class that implements the desired behavior</i>
when the <i class="text-secondary-light">createStub()</i> method is used._

### Mock Objects

_The practice of replacing an object with a test double that verifies expectations,
for instance asserting that a method has been called, is referred to as mocking._

#### Best Example

This

```php
<?php
class Payment{
    public function processPayment(array $paymentDetails)
    {
        $transaction = new \AuthorizeNetAIM(self::API_ID, self::TRANS_KEY);
        $transaction->amount = $paymentDetails['amount'];
        $transaction->card_num = $paymentDetails['card_num'];
        $transaction->exp_date = $paymentDetails['exp_date'];

        $response = $transaction->authorizeAndCapture();

        if ($response->approved) {
            return $this->savePayment($response->transaction_id);
        }

        throw new \Exception($response->error_message);
    }
}
```

becomes this:

```php
<?php
class Payment{
    public function processPayment(\AuthorizeNetAIM $transaction, array $paymentDetails)
    {
        $transaction->amount = $paymentDetails['amount'];
        $transaction->card_num = $paymentDetails['card_num'];
        $transaction->exp_date = $paymentDetails['exp_date'];

        $response = $transaction->authorizeAndCapture();

        if ($response->approved) {
            return $this->savePayment($response->transaction_id);
        }

        throw new \Exception($response->error_message);
    }
}
```

test:

```php
<?php

namespace phpUnitTutorial\Test;

use phpUnitTutorial\Payment;

class PaymentTest extends \PHPUnit_Framework_TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = array(
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        );

        $payment = new Payment();

        $response = new \stdClass();
        $response->approved = true;
        $response->transaction_id = 123;

        $authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
            ->setConstructorArgs(array($payment::API_ID, $payment::TRANS_KEY))
            ->getMock();

        $authorizeNet->expects($this->once())
            ->method('authorizeAndCapture')
            ->will($this->returnValue($response));

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```

**Mock Object**

A mock object is an object that you would create using PHPUnit’s <i class="text-secondary-light">getMockBuilder()</i> method.
It is basically an object that extends the class you define and allows you to perform nifty tricks and assertions on it.

### Stub Method

A stub method is a method contained within a mock object that returns null by default,
but allows you to easily override the return value.

### Mock Method

it does the exact same thing its original method would.
any code that is in the method you are mocking will actually run and will not return null by default

mock methods do not allow you to override the return value.

a stub is a method that returns null by default

### THE FOUR PATHWAYS OF GETMOCKBUILDER()

It all depends on your use, or non-use, of the setMethods() method.

**1 Do not call setMethods()**

```php
<?php
$authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
    ->getMock();
```

```html
This produces a mock object where the methods Are all stubs, All return null by
default, Are easily overridable
```

**2 Passing an empty array**

```php
<?php

$authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
    ->setMethods(array())
    ->getMock();
```

```html
This produces a mock object that is exactly the same as if you have not called
setMethods() at all. The methods
```

**3 Passing null**

```php
<?php

$authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
    ->setMethods(null)
    ->getMock();
```

```html
This produces a mock object where the methods Are all mocks, Run the actual code
contained within the method when called, Do not allow you to override the return
value
```

**4 Passing an array containing method names**

```php
<?php
$authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
    ->setMethods(array('authorizeAndCapture', 'foobar'))
    ->getMock();
```

```html
This produces a mock object whose methods are a mix of the above three
scenarios. The methods you have identified Are all stubs, All return null by
default, Are easily overridable Methods you did not identify Are all mocks, Run
the actual code contained within the method when called, Do not allow you to
override the return value
```
