<script>
    import { createEventDispatcher } from 'svelte';

    $: invalidEmail = email.indexOf('@') === -1;
    $: invalidDate = new Date(payment.expirydate) < Date.now();
    $: invalidPassword = (draft_password != password) || String(password).length < 8;

    let draft_password;
    let password;

    const dispatch = createEventDispatcher();
    const submit = () => dispatch("submit", { email, name, address, payment, password });

    export let email;
    export let name;
    export let address;
    export let payment;

</script>
<form>
    <fieldset class="fields-personalia">
        <legend>Personalia</legend>
        <div class:invalid-email={invalidEmail} class="field">
            <label class="form-label">email</label>
            <wired-card class="input-border"><input class:invalid-email={invalidEmail} placeholder="enter email"
                    bind:value={email} type="text" class="form-input"></wired-card>
        </div>
        <div class="field">
            <label class="form-label">Full name</label>
            <wired-card class="input-border"><input placeholder="enter name" class="form-input" bind:value={name}
                    type="text"></wired-card>
        </div>
    </fieldset>
    <fieldset class="fields-password">
        <legend>Password</legend>
        <div class="field">
            <label class="form-label"> Password </label>
            <wired-card class="input-border"><input class="form-input" bind:value={draft_password} type="password">
            </wired-card>
        </div>
        <div class="field" class:invalid-password={invalidPassword}>
            <label class="form-label"> Repeat </label>
            <wired-card class="input-border"><input class="form-input" bind:value={password} type="password">
            </wired-card>
        </div>
    </fieldset>

    <fieldset class="fields-address">
        <legend>Address</legend>
        <div class="field">
            <label class="form-label"> Street </label>
            <wired-card class="input-border"><input class="form-input" bind:value={address.street} type="text">
            </wired-card>
            <label class="form-label form-label-short"> Nr </label>
            <wired-card class="input-border"><input class="form-input form-input-short"
                    bind:value={address.streetnumber} type="text"></wired-card>
        </div>
        <div class="field">
            <label class="form-label"> City </label>
            <wired-card class="input-border"><input class="form-input" bind:value={address.city} type="text">
            </wired-card>
            <label class="form-label form-label-short"> Zip </label>
            <wired-card class="input-border"><input class="form-input form-input-short" bind:value={address.postcode}
                    type="text">
            </wired-card>
        </div>
    </fieldset>
    <fieldset class="fields-payment">
        <legend>Payment</legend>
        <div class="field" class:invalid-date={invalidDate}>
            <label class="form-label">Provider</label>
            <wired-card class="input-border"><input class="form-input" bind:value={payment.cardprovider} type="text">
            </wired-card>
            <label class="form-label form-label-short form-label-date">Expiry date</label>
            <wired-card class="input-border"><input class="form-input form-input-short form-input-date" bind:value={payment.expirydate}
                    type="text"></wired-card>
        </div>
        <div class="field">
            <label class="form-label">Number</label>
            <wired-card class="input-border"><input class="form-input" bind:value={payment.cardnumber} type="text">
            </wired-card>
            <label class="form-label form-label-short">CVS</label>
            <wired-card class="input-border"><input class="form-input form-input-short" bind:value={payment.cvs}
                    type="text"></wired-card>
        </div>
    </fieldset>
    <wired-button class="submit" on:click={submit}>Submit</wired-button>
</form>
<style>
    form {
        display: grid;
        grid-gap: 2em;
        grid-template-columns: auto, auto;
    }

    .field {
        display: flex;
    }

    fieldset {
        height: 100%;
    }

    .fields-personalia {
        grid-column: 1;
        grid-row: 1;
        margin-bottom: 1em;
    }

    .fields-password {
        grid-column: 1;
        grid-row: 2;
        margin-bottom: 1em;
    }

    .fields-address {
        grid-column: 2;
        grid-row: 1;
    }

    .fields-payment {
        grid-column: 2;
        grid-row: 2;
    }

    .form-label {
        flex: auto;
        min-width: 80px;
        padding: 0.5em;
        position: relative;
    }

    .form-label-short {
        text-align: right;
    }

    .form-input {
        width: 300px;
        font-family: 'Architects Daughter', cursive;
        font-size: 0.9rem;
        line-height: 30px;
        border: 0;
        padding: 2px;
        padding-left: 12px;
    }

    .form-input-short {
        width: 60px;
    }

    .input-border {
        padding: 0;
        height: 40px;
    }

    .invalid-email input {
        background-color: lightpink;
    }

    .invalid-email label::after {
        color: rgb(209, 65, 65);
        font-weight: 700;
        content: '(need @)';
        display: inline-block;
        position: absolute;
        right: 6px;
    }

    .invalid-password input {
        background-color: lightpink;
    }

    .invalid-password label::after {
        color: rgb(209, 65, 65);
        font-weight: 700;
        content: '(thats no password!)';
        display: inline-block;
        position: absolute;
        left: 6px;
        top: 40px;
    }

    .invalid-date input.form-input-date {
        background-color: lightpink;
    }

    .invalid-date label.form-label-date::after {
        color: rgb(209, 65, 65);
        font-weight: 700;
        content: '(???)';
        display: inline-block;
        position: absolute;
        right: 6px;
        top: 25px;
    }

    .submit {
        width: 80px;
        float: right;
        background-color: lightsteelblue;
        position: relative;
        right: -80%;
        grid-column: 2;
    }
</style>