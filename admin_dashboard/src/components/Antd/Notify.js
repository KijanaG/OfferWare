import { notification } from 'antd';

export const _notifyStripe = () => {
    notification.info({
        message: "Connect Stripe Account",
        description: "Please follow the steps to connect this account with Stripe.",
        placement: 'topRight',
        duration: 5
    });
}

export const _notifyWelcomeBack = () => {
    notification.success({
        message: "Welcome Back!",
        placement: 'topRight',
        duration: 5
    });
}

export const _notifyWelcomeNew = () => {
    notification.success({
        message: "Welcome to your Dashboard",
        description: 'Please create your password.',
        placement: 'topRight',
        duration: 5
    });
}

export const _notifyError = (err) => {
    notification.error({
        message: 'Error',
        description: `${typeof (err) == "object" ? err.message : err}`,
        placement: 'topRight',
        duration: 5
      })
}

export const _notifyVerification = (data) => {
    notification.success({
        message: `Verification Code Sent to ${data['CodeDeliveryDetails'].Destination}`,
        description: 'Check Email for verification code.',
        placement: 'topRight',
        duration: 5
      })
}

export const _notifySuccess = () => {
    notification.success({
        message: "Reset Successful",
        description: 'Successfully reset password.',
        placement: 'topRight',
        duration: 5
    })
}

export const _notifyEmailFound = () => {
    notification.success({
        message: "Success!",
        description: "This email was found connected to this merchant. Now please register a new account.",
        placement: "topRight",
        duration: 5
    })
}

export const _notifyVerifyEmail = () => {
    notification.info({
        message: "Verification, for safety!",
        description: "A verification code was sent to your email.",
        placement: 'topRight',
        duration: 5,
        onClose: () => { return }
      })
}