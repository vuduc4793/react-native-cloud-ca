package com.cloudca;

import com.viettel.sdk.gosignsdk.network.response.ErrorType;

public class CustomException extends Exception {
  private ErrorType errorCode;
  private String errorMessage;

  public CustomException(ErrorType errorCode, String errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  public ErrorType getErrorCode() {
    return errorCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public String getError() {
    return String.format("%s: %s", errorCode, errorMessage);
  }
}
