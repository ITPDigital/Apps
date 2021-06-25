
package com.pagesuite.droid.arabianbusiness.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class VideoList {

    @SerializedName("nid")
    @Expose
    private String nid;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("lead_text")
    @Expose
    private String leadText;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("path_alias")
    @Expose
    private String pathAlias;
    @SerializedName("body")
    @Expose
    private String body;
    @SerializedName("media_embed")
    @Expose
    private List<Object> mediaEmbed = null;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("byline")
    @Expose
    private String byline;
    @SerializedName("author")
    @Expose
    private Object author;
    @SerializedName("published_date")
    @Expose
    private String publishedDate;
    @SerializedName("published_date_extra")
    @Expose
    private PublishedDateExtra publishedDateExtra;
    @SerializedName("created_date")
    @Expose
    private String createdDate;
    @SerializedName("created_datetime")
    @Expose
    private String createdDatetime;
    @SerializedName("field_picture_ref")
    @Expose
    private FieldPictureRef fieldPictureRef;
    @SerializedName("article_context")
    @Expose
    private ArticleContext articleContext;
    @SerializedName("story_relation")
    @Expose
    private Object storyRelation;
    @SerializedName("gallery_relation")
    @Expose
    private Object galleryRelation;
    @SerializedName("video_relation")
    @Expose
    private VideoRelation videoRelation;
    @SerializedName("video")
    @Expose
    private String video;
    @SerializedName("stopComment")
    @Expose
    private Integer stopComment;
    @SerializedName("tagstyle")
    @Expose
    private Tagstyle tagstyle;
    @SerializedName("classstyle")
    @Expose
    private Classstyle classstyle;
    @SerializedName("brand_logo")
    @Expose
    private String brandLogo;
    @SerializedName("brand_logo_dark")
    @Expose
    private String brandLogoDark;
    @SerializedName("article_template")
    @Expose
    private String articleTemplate;
    @SerializedName("bookmark_ids")
    @Expose
    private String bookmarkIds;

    public String getNid() {
        return nid;
    }

    public void setNid(String nid) {
        this.nid = nid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLeadText() {
        return leadText;
    }

    public void setLeadText(String leadText) {
        this.leadText = leadText;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPathAlias() {
        return pathAlias;
    }

    public void setPathAlias(String pathAlias) {
        this.pathAlias = pathAlias;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<Object> getMediaEmbed() {
        return mediaEmbed;
    }

    public void setMediaEmbed(List<Object> mediaEmbed) {
        this.mediaEmbed = mediaEmbed;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getByline() {
        return byline;
    }

    public void setByline(String byline) {
        this.byline = byline;
    }

    public Object getAuthor() {
        return author;
    }

    public void setAuthor(Object author) {
        this.author = author;
    }

    public String getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }

    public PublishedDateExtra getPublishedDateExtra() {
        return publishedDateExtra;
    }

    public void setPublishedDateExtra(PublishedDateExtra publishedDateExtra) {
        this.publishedDateExtra = publishedDateExtra;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedDatetime() {
        return createdDatetime;
    }

    public void setCreatedDatetime(String createdDatetime) {
        this.createdDatetime = createdDatetime;
    }

    public FieldPictureRef getFieldPictureRef() {
        return fieldPictureRef;
    }

    public void setFieldPictureRef(FieldPictureRef fieldPictureRef) {
        this.fieldPictureRef = fieldPictureRef;
    }

    public ArticleContext getArticleContext() {
        return articleContext;
    }

    public void setArticleContext(ArticleContext articleContext) {
        this.articleContext = articleContext;
    }

    public Object getStoryRelation() {
        return storyRelation;
    }

    public void setStoryRelation(Object storyRelation) {
        this.storyRelation = storyRelation;
    }

    public Object getGalleryRelation() {
        return galleryRelation;
    }

    public void setGalleryRelation(Object galleryRelation) {
        this.galleryRelation = galleryRelation;
    }

    public VideoRelation getVideoRelation() {
        return videoRelation;
    }

    public void setVideoRelation(VideoRelation videoRelation) {
        this.videoRelation = videoRelation;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Integer getStopComment() {
        return stopComment;
    }

    public void setStopComment(Integer stopComment) {
        this.stopComment = stopComment;
    }

    public Tagstyle getTagstyle() {
        return tagstyle;
    }

    public void setTagstyle(Tagstyle tagstyle) {
        this.tagstyle = tagstyle;
    }

    public Classstyle getClassstyle() {
        return classstyle;
    }

    public void setClassstyle(Classstyle classstyle) {
        this.classstyle = classstyle;
    }

    public String getBrandLogo() {
        return brandLogo;
    }

    public void setBrandLogo(String brandLogo) {
        this.brandLogo = brandLogo;
    }

    public String getBrandLogoDark() {
        return brandLogoDark;
    }

    public void setBrandLogoDark(String brandLogoDark) {
        this.brandLogoDark = brandLogoDark;
    }

    public String getArticleTemplate() {
        return articleTemplate;
    }

    public void setArticleTemplate(String articleTemplate) {
        this.articleTemplate = articleTemplate;
    }

    public String getBookmarkIds() {
        return bookmarkIds;
    }

    public void setBookmarkIds(String bookmarkIds) {
        this.bookmarkIds = bookmarkIds;
    }

}
