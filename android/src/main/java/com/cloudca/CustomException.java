package com.cloudca;


import com.viettel.sdk.gosignsdk.utils.ErrorType;

public class CustomException extends Throwable {
  private ErrorType errorCode;
  private String errorMessage;

  public CustomException(ErrorType errorCode, String errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  public String getErrorCode() {
    return String.format("%s", errorCode);
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public String getError() {
    return String.format("%s: %s", errorCode, errorMessage);
  }
}
