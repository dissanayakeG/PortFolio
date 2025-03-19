---
title: "Authentication with laravel Sanctum and VueJs"
subtitle: "SPA authentication with laravel Sanctum and VueJs"
date: "2024-11-08"
tags: "#Laravel, #VueJs, #SPA, #Authentication"
---

# SPA authentication with laravel Sanctum and VueJs

Create a new laravel project by running

```
composer create-project --prefer-dist laravel/laravel:^10.0 "project-name"
```

Then navigate to the created project and open it with any IDE.

<br>
Then run

```
composer update && php artisan key:gen
```

Update <i class="text-secondary-light">.env </i> file with follwing details

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sanctum
DB_USERNAME=YourUserNameHere
DB_PASSWORD=YourPasswordHere
```

create a database by running

```
mysql -u root -p -e "create database sanctum;"
```

<i class="text-secondary-light">Let's first setup sanctum for the newly created laravel project.</i>

By default sanctum is configured in new versions of laravel, But please check them with following steps.

Install sanctum

```php
composer require laravel/sanctum
```

Then publish the vendor

```php
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Run the migrations

```php
php artisan migrate
```

update <i class="text-secondary-light">app/http/kernel.php</i>

```php
'api' => [
   \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, //uncomment this line
   \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
   \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

Update <i class="text-secondary-light">config/cors.php</i>

```php
'paths' => [
    'api/*',
    '/login',
    '/logout',
    '/sanctum/csrf-cookie'
],

'supports_credentials' => true,
```

<i class="text-secondary-light">According to the laravel documentation</i>
<a style="color:blue" href="https://laravel.com/docs/10.x/sanctum#csrf-protection">(https://laravel.com/docs/10.x/sanctum#csrf-protection)</a>

To authenticate your SPA, your SPA's "login" page should first make a request to the
<i class="text-secondary-light">/sanctum/csrf-cookie </i>
endpoint to initialize CSRF protection for the application:

```php
axios.get('/sanctum/csrf-cookie').then(response => {
    // Login...
});
```

During this request, Laravel will set an

<i class="text-secondary-light">XSRF-TOKEN </i>cookie containing the current
<i class="text-secondary-light">CSRF </i>token. This token should then be passed in an
<i class="text-secondary-light">X-XSRF-TOKEN</i> header on subsequent requests, which some HTTP client libraries
like Axios and the Angular HttpClient will do automatically for you. If your JavaScript HTTP library does not set the value for you, you will need to manually set the
<i class="text-secondary-light">X-XSRF-TOKEN</i> header to ma-t-ch the value of the
<i class="text-secondary-light">XSRF-TOKEN</i> cookie that is set by this route.

Update <i class="text-secondary-light">User.php</i> model

```php
<?php

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    ...
}
```

Update your <i class="text-secondary-light">.env</i> to have these lines

```php
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost #port will not be a matter
SANCTUM_STATEFUL_DOMAIN=localhost:8000
```

<i class="text-secondary-light">if your browser request from 127.0.0.1 instead localhost, update exact same value in SESSION_DOMAIN</i>

Update <i class="text-secondary-light">config/sanctum.php </i>
make sure to add client domain with port(if local) in stateful

```php
'stateful' => explode(',', env(
        'SANCTUM_STATEFUL_DOMAINS',
        'localhost,localhost:8000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ',' . parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    )),
```

If you want you can ignore apis from authenticating

update <i class="text-secondary-light">app/Http/Middleware/VerifyCsrfToken.php</i>

```php
protected $except = [
        // '/api/auth/login',
        // '/api/auth/register',
    ];
```

Update your <i class="text-secondary-light">api.php</i>

```php
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/auth/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});
```

Create <i class="text-secondary-light">AuthController</i> by running

```php
php artisan make:controller AuthController
```

And paste below in the AuthController

```php
<?php

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
   public $loginAfterSignUp = true;

   public function register(Request $request)
   {
       $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => bcrypt($request->password),
       ]);

       $token = auth()->login($user);

       return response(['status' => 'success', 'data' => $user], 200);
   }

   public function login(Request $request)
   {
       $credentials = $request->only(['email', 'password']);

       if (!$token = auth()->attempt($credentials)) {
           return ['data' => ['errors' => ['validations' => ['user_name' => 'Invalid user name or password']]]];
       }
       $user = auth()->user();

       return $this->respondWithToken($token);
   }

   public function logout()
   {
       auth()->logout();

       return response()->json(['message' => 'Successfully logged out']);
   }

   public function refresh()
   {
       return $this->respondWithToken(auth()->refresh());
   }

   protected function respondWithToken($token)
   {
       $user = auth()->user();

       return response()->json([
           'access_token' => $token,
           'user' => $user,
       ]);
   }
}
```

<i class="text-secondary-light">Now let's create frontend for this application</i>

Open a terminal window from the project root and execute below commands

```php
npm install vue@next vue-loader@next
npm i @vitejs/plugin-vue
npm install vue-router
npm install vuex --save
npm install axios

//in order to persist some information in browser local storage.
npm i vuex-persistedstate
```

Update your <i class="text-secondary-light">vite.config.json</i> file

```php
<?php

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
    ],
});
```

Install tailwind css

```php
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

And update your <i class="text-secondary-light">tailwind.config.json</i>

```php
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update your <i class="text-secondary-light">resources.boostrap.js</i> file

```php
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.withCredentials = true
```

Now update your <i class="text-secondary-light">app.js</i>

```php
import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue'

import app from './Components/App.vue'

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

createApp(app).mount("#app")
```

Now we need to create that <i class="text-secondary-light">App.vue in resources/js/Components/</i>

Create new file called <i class="text-secondary-light">App.vue</i>

```php
<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
```

We have to render this vue component in our
<i class="text-secondary-light">welcome.blade.php</i>

So first of all update <i class="text-secondary-light">web.php</i> route file

```php
Route::get('/{any}', function () {
    return view('welcome	');
})->where('any', '^(?!api\/)[\/\w\.-]*');
```

And then the <i class="text-secondary-light">welcome.blade.php</i>

```php
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Vue3 + Laravel9</title>

	@vite('resources/css/app.css')
</head>
<body>
	<div id="app"></div>

	@vite('resources/js/app.js')
</body>
</html>
```

Now the basic structure is completed, now we are going to apply authentication components and logics here

You can check if the application working by running
<i class="text-secondary-light">php artisan serve</i> and
<i class="text-secondary-light">npm run dev</i> on two terminal windows

If it works, move on; otherwise, do some debugging.

Create the <i class="text-secondary-light">resources/js/store directory and auth.js and index.js</i> in it.

Update <i class="text-secondary-light">index.js</i>

```php
<?php

import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth.js'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth
    }
})

export default store
```

Update <i class="text-secondary-light">auth.js</i>

```php
<?php

import axios from 'axios'
import router from '../router.js'

export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        }
    },
    actions:{
        login({commit}){
            return axios.get('/api/auth/user').then((response)=>{
                commit('SET_USER',response.data)
                commit('SET_AUTHENTICATED',true)
                router.push({ name: 'dashBoard', params: {} }).catch(error => {
                    console.info(error.message)
                 })
                // this.$router.push({ name: 'dashBoard', params: {} }).catch(() => {});

            }).catch((error)=>{
                console.error("An error occurred:", error);
                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
            })
        },
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        }
    }
}
```

Create <i class="text-secondary-light">resources/js/router.js</i> and paste below

```php
<?php

import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

const Login = () => import('./Components/Login.vue')
const Register = () => import('./Components/Register.vue')
const Dashboard = () => import('./Components/DashBoard.vue')


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        name: "dashBoard",
        path: "/",
        component: Dashboard,
        meta: {
            middleware: "auth"
        },
    },
    {
        name: "dashBoard",
        path: "/dashBoard",
        component: Dashboard,
        meta: {
            middleware: "auth"
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const state = {
    isRedirecting: false
}

router.beforeEach((to, from, next) => {
    if (!state.isRedirecting && to.meta.middleware == "guest") {
        state.isRedirecting = true;
        if (store.state.auth.authenticated) {
            next({ name: "dashBoard" })
        }
        next()
    } else {
        state.isRedirecting = false;
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router
```

Update your <i class="text-secondary-light">app.js</i>

```php
import './bootstrap';
import '../css/app.css';

import store from './store/index'

import { createApp } from 'vue'

import router from './router'

import app from './Components/App.vue'

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

createApp(app).use(router).use(store).mount("#app")
```

Now create <i class="text-secondary-light">resources/js/Components/Login.vue</i> and paste

```php
<template>
    <form>
        Email:<input type="email" v-model="email" />

        Password:<input type="password" v-model="password" />

        <button type="submit" @click.prevent="login">Login</button>
    </form>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "login",

        data() {
            return {
                token: "",
                email: "",
                password: "",
                errors: {},
            };
        },

        mounted() {},

        methods: {
            ...mapActions({
                signIn: "auth/login",
            }),
            async login() {
                let credentials = {
                    email: this.email,
                    password: this.password,
                };
                await axios.get("/sanctum/csrf-cookie");

                await axios
                    .post("/api/auth/login", credentials)
                    .then(({ data }) => {
                        this.signIn();
                    })
                    .catch(({ response }) => {
                        if (response.status === 422) {
                            this.validationErrors = response.data.errors;
                        } else {
                            this.validationErrors = {};
                            alert(response.data.message);
                        }
                    })
                    .finally(() => {
                        this.processing = false;
                    });
            },
        },
    };
</script>
```

And create <i class="text-secondary-light">resources/js/Components/Register.vue</i>

```php
<template>
    <form>
        User Name:<input type="text" v-model="user_name" />

        Email:<input type="email" v-model="email" />

        Password:<input type="password" v-model="password" />

        <button type="submit" @click.prevent="register">Register</button>
    </form>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        data() {
            return {
                user_name: "",
                email: "",
                password: "",
                errors: {},
            };
        },

        mounted() {},

        methods: {
            ...mapActions({
                signIn: "auth/login",
            }),
            async register() {
                let credentials = {
                    name: this.user_name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password,
                };

                await axios.get("/sanctum/csrf-cookie");

                await axios
                    .post("/api/auth/register", credentials)
                    .then(response => {
                        this.validationErrors = {};
                        this.signIn();
                    })
                    .catch(({ response }) => {
                        if (response.status === 422) {
                            this.validationErrors = response.data.errors;
                        } else {
                            this.validationErrors = {};
                            alert(response.data.message);
                        }
                    })
                    .finally(() => {
                        this.processing = false;
                    });
            },
        },
    };
</script>
```

Update <i class="text-secondary-light">App.vue</i>

```php
<template>
    <div>
        <div class="mb-5">
            <nav class="navbar fixed-top bg-gray-800 text-white mb-5">
                <ul class="navbar-nav flex items-center justify-end flex-wrap py-4 px-8 space-x-4" style="width: 100%">
                    <li class="nav-item {{ $route.name === 'dashboard' ? 'active' : '' }}">
                        <router-link to="/dashboard" class="nav-link font-semibold hover:text-blue-500"> Home</router-link>
                    </li>
                    <li class="nav-item {{ $route.name === 'login' ? 'active' : '' }}">
                        <router-link to="/login" class="nav-link font-semibold hover:text-blue-500"> SignIn</router-link>
                    </li>
                    <li class="nav-item {{ $route.name === 'register' ? 'active' : '' }}">
                        <router-link to="/register" class="nav-link font-semibold hover:text-blue-500"> SignUp</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="dropdown-item" href="javascript:void(0)" @click="logout"> Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <router-view> </router-view>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "App.vue",
        data() {
            return {
                user: this.$store.state.auth.user,
            };
        },
        mounted() {
            console.log("user: ", this.$store.state.auth.user);
        },

        methods: {
            ...mapActions({
                signOut: "auth/logout",
            }),
            async logout() {
                await axios.post("/api/auth/logout").then(({ data }) => {
                    this.signOut();
                    this.$router.push({ name: "login" });
                });
            },
        },
    };
</script>
```

Finally create <i class="text-secondary-light">resources/js/Components/DashBoard.vue</i>

```php
<template>
    <div>
        You are in dashboard
    </div>
</template>
```
