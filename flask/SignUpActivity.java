// SignUpActivity.java
public class SignUpActivity extends FragmentActivity
    implements SignUpFragment.OnFragmentInteractionListener,
    SignUpConfirmFragment.OnFragmentInteractionListener {
    
...

@Override
public void signUp(String email, String password) {
    userName = email;
    this.password = password;

    // Add code here
    final Map<String, String> attributes = new HashMap<>();
    attributes.put("email", email);
    AWSMobileClient.getInstance().signUp(userName, password, attributes, null, new Callback<SignUpResult>() {
        @Override
        public void onResult(final SignUpResult signUpResult) {
            runOnUiThread(() -> {
                if (!signUpResult.getConfirmationState()) {
                    final UserCodeDeliveryDetails details = signUpResult.getUserCodeDeliveryDetails();
                    makeToast(context, "Confirm sign-up with: " + details.getDestination());
                    setSignUpConfirmFragment();
                } else {
                    makeToast(context, "Sign-up done.");
                }
            });
        }

        @Override
        public void onError(Exception e) {
            Log.e(TAG, "Sign-up error", e);
            runOnUiThread(() -> {
                if (e instanceof AmazonServiceException)
                    makeToast(context, ((AmazonServiceException) e).getErrorMessage());
            });
        }
    });
}

...

}