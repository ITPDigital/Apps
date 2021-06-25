
package com.pagesuite.droid.arabianbusiness.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class FieldPictureRefUnd {

    @SerializedName("target_id")
    @Expose
    private String targetId;
    @SerializedName("image_caption")
    @Expose
    private String imageCaption;
    @SerializedName("image_title")
    @Expose
    private String imageTitle;
    @SerializedName("excluded_status")
    @Expose
    private Integer excludedStatus;
    @SerializedName("image_path")
    @Expose
    private String imagePath;
    @SerializedName("image_crop_landscape")
    @Expose
    private String imageCropLandscape;
    @SerializedName("image_crop_square")
    @Expose
    private String imageCropSquare;
    @SerializedName("image_crop_portrait")
    @Expose
    private String imageCropPortrait;

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public String getImageCaption() {
        return imageCaption;
    }

    public void setImageCaption(String imageCaption) {
        this.imageCaption = imageCaption;
    }

    public String getImageTitle() {
        return imageTitle;
    }

    public void setImageTitle(String imageTitle) {
        this.imageTitle = imageTitle;
    }

    public Integer getExcludedStatus() {
        return excludedStatus;
    }

    public void setExcludedStatus(Integer excludedStatus) {
        this.excludedStatus = excludedStatus;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageCropLandscape() {
        return imageCropLandscape;
    }

    public void setImageCropLandscape(String imageCropLandscape) {
        this.imageCropLandscape = imageCropLandscape;
    }

    public String getImageCropSquare() {
        return imageCropSquare;
    }

    public void setImageCropSquare(String imageCropSquare) {
        this.imageCropSquare = imageCropSquare;
    }

    public String getImageCropPortrait() {
        return imageCropPortrait;
    }

    public void setImageCropPortrait(String imageCropPortrait) {
        this.imageCropPortrait = imageCropPortrait;
    }

}
