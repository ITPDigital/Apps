//package com.itpmedia.ab.ui;
//
//import android.Manifest;
//import android.content.Intent;
//import android.content.pm.PackageManager;
//import android.database.Cursor;
//import android.graphics.Bitmap;
//import android.graphics.drawable.Drawable;
//import android.net.Uri;
//import android.os.Build;
//import android.os.Bundle;
//import android.provider.MediaStore;
//
//import android.text.Html;
//import android.text.method.ScrollingMovementMethod;
//import android.util.Log;
//import android.view.View;
//import android.view.WindowManager;
//import android.widget.ImageView;
//import android.widget.ProgressBar;
//import android.widget.TextView;
//import android.widget.Toast;
//
//import androidx.annotation.NonNull;
//import androidx.core.app.ActivityCompat;
//import androidx.recyclerview.widget.LinearLayoutManager;
//import androidx.recyclerview.widget.RecyclerView;
//
//import com.bumptech.glide.Glide;
//import com.bumptech.glide.load.engine.DiskCacheStrategy;
//import com.bumptech.glide.request.target.CustomTarget;
//import com.bumptech.glide.request.transition.Transition;
//
//import com.itpmedia.ab.BlueConicModule;
//import com.itpmedia.ab.MainApplication;
//import com.itpmedia.ab.constants.IntentExtras;
//import com.itpmedia.ab.model.request.CheckBookmarkRequest;
//import com.itpmedia.ab.model.request.SaveBookmarkRequest;
//import com.itpmedia.ab.model.response.video.VideoList;
//import com.itpmedia.ab.model.response.video.VideoRelation;
//import com.itpmedia.ab.model.response.video.VideoRelationUnd;
//import com.pagesuite.droid.arabianbusiness.R;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import java.net.URLEncoder;
//
//import javax.annotation.Nullable;
//
//public class YoutubePlayerActivity extends YouTubeBaseActivity implements YouTubePlayer.OnInitializedListener, VideoViewHolder.VideoItemClickListner, YoutubePlayerContract.View {
//    public static final String DEVELOPER_KEY = "AIzaSyAU_RWJZh99f1RgIpBv4Fazc6F920xsLNc";
//    private static final int RECOVERY_DIALOG_REQUEST = 1;
//    private RecyclerView mVideoListRecyclerView;
//    private YouTubePlayer mYoutubePlayer;
//    private YoutubePlayerPresenter mPresenter;
//    private TextView mVideoDescription;
//    private ProgressBar mProgressBar;
//    private TextView mVideoTitle;
//    private String mShareUrl;
//    private String mVideoId;
//    private String mNid;
//    private String mDeeplinkUrl;
//    private String mSite;
//    private ImageView mBookmarkIcon;
//    private Boolean mIsBookmarked;
//    private String mUid;
//    private String mBearerToken;
//    private String mArticleIdList;
//    private ArrayList<String> mBookmarkIdList;
//    private VideoRelation mVideoRelation = null;
//    private VideoListRecyclerViewAdapter mVideoListRecyclerViewAdapter;
//    private final int REQUEST_CODE_SHARE = 100;
//    private Uri imageUri = null;
//
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
//        setContentView(R.layout.activity_youtube_player);
//        hideStatusBar();
//        initViews();
//        getBundleArguments();
//        initPresenter();
////        getVideoList();
//    }
//
//    private void getBundleArguments() {
//        if (getIntent() != null && getIntent().getExtras() != null) {
//            mNid = getIntent().getStringExtra(IntentExtras.EXTRA_NID);
//            mSite = getIntent().getStringExtra(IntentExtras.EXTRA_SITE);
//            mUid = getIntent().getStringExtra(IntentExtras.USER_ID);
//            mBearerToken = getIntent().getStringExtra(IntentExtras.BEARER_TOKEN);
//        }
//    }
//
//
//    private void initPresenter() {
//        mPresenter = new YoutubePlayerPresenter(this);
//    }
//
//    private void initViews() {
//        initVideoListRecyclerView();
//        YouTubePlayerView youTubeView = (YouTubePlayerView) findViewById(R.id.youtube_view);
//        ImageView shareButton = findViewById(R.id.share_video);
//        mVideoDescription = findViewById(R.id.main_video_description);
//        mVideoDescription.setMovementMethod(new ScrollingMovementMethod());
//        mProgressBar = findViewById(R.id.progress_indicator);
//        mVideoTitle = findViewById(R.id.main_video_title);
//        mBookmarkIcon = findViewById(R.id.bookmark_image);
//        setShareClick(shareButton);
//        setBookmarkClick();
//        setBackButtonClick();
//        youTubeView.initialize(DEVELOPER_KEY, this);
//    }
//
//    private void setBackButtonClick() {
//        ImageView backButton = findViewById(R.id.back_button);
//        if (backButton != null) {
//            backButton.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View view) {
//                    onBackPressed();
//                }
//            });
//        }
//    }
//
//    private void setBookmarkClick() {
//        mBookmarkIcon.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                onBookmarkIconClicked();
//            }
//        });
//    }
//
//    private void setShareClick(ImageView shareButton) {
//        shareButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                 try{
//                    shareVideo(mShareUrl, mVideoId,mNid,mDeeplinkUrl);
//                    } catch(Exception e){
//                }
//            }
//        });
//    }
//
//    private void onBookmarkIconClicked() {
//        if (getBearerToken() != null && mIsBookmarked!=null && getSaveBookmarkRequest(mNid, mSite, mIsBookmarked) != null) {
//            mPresenter.saveBookmark(getSaveBookmarkRequest(mNid, mSite, mIsBookmarked), getBearerToken(), false, null);
//        } else {
//            Toast.makeText(YoutubePlayerActivity.this, "Something went wrong...Please try later!", Toast.LENGTH_LONG).show();
//        }
//    }
//
//    private SaveBookmarkRequest getSaveBookmarkRequest(String nId, String site, boolean isBookmarked) {
//        if (mUid != null &&
//                !(mUid.isEmpty())) {
//            SaveBookmarkRequest saveBookmarkRequest = new SaveBookmarkRequest(mUid,
//                    nId, site, isBookmarked ? "U" : "F");
//            return saveBookmarkRequest;
//        } else {
//            return null;
//        }
//    }
//
//
//    private void shareVideo(String imgUrl, final String videoId, String nid, String deeplinkURL) throws Exception{
//      StringBuilder FinalURLSB = new StringBuilder("https://arabianbusiness.page.link/");
//      FinalURLSB.append("?nid=");
//      FinalURLSB.append(nid);
//      FinalURLSB.append("&ct=");
//      FinalURLSB.append("video");
//      StringBuilder deeplinkSB = new StringBuilder(deeplinkURL);
//      deeplinkSB.append("?ct=");
//      deeplinkSB.append("video");
//      deeplinkSB.append("&nid=");
//      deeplinkSB.append(nid);
//      String encodedUrl = URLEncoder.encode(deeplinkSB.toString(), "UTF-8");
//      FinalURLSB.append("&link=");
//      FinalURLSB.append(encodedUrl);
//      FinalURLSB.append("?ibi=com.itpmedia.ab&apn=com.itpmedia.ab&isi=1466594419");
//      System.out.println(FinalURLSB);
//        if (imgUrl != null && !imgUrl.isEmpty() && videoId != null && !videoId.isEmpty()) {
//            if (hasExternalStoragePermission()) {
//                showProgressIndicator(true);
//                Glide.with(this).asBitmap()
//                        .load(imgUrl)
//                        .diskCacheStrategy(DiskCacheStrategy.RESOURCE)
//                        .into(new CustomTarget<Bitmap>() {
//                            @Override
//                            public void onResourceReady(@NonNull Bitmap resource, @Nullable Transition<? super Bitmap> transition) {
//                                showProgressIndicator(false);
//                                Log.d("Size ", "width :" + resource.getWidth() + " height :" + resource.getHeight());
//                                Intent intent = new Intent(Intent.ACTION_SEND);
//                                String path = MediaStore.Images.Media.insertImage(getContentResolver(), (resource), "", null);
//                                imageUri = Uri.parse(path);
//                                intent.putExtra(Intent.EXTRA_STREAM, imageUri);
//                                intent.putExtra(Intent.EXTRA_TEXT, FinalURLSB.toString());
//                                intent.setType("image/*");
//                                startActivity(Intent.createChooser(intent, "Share via...")/*,REQUEST_CODE_SHARE*/);
//                            }
//
//
//                            @Override
//                            public void onLoadCleared(@Nullable Drawable placeholder) {
//                            }
//
//
//                        });
//            }
//        } else {
//            Toast.makeText(YoutubePlayerActivity.this, "Unable to share the video", Toast.LENGTH_LONG).show();
//        }
//    }
//
//
//    private void deleteImageAfterShare() {
//        Cursor cursor = null;
//        String path = null;
//        try {
//            String[] proj = { MediaStore.Images.Media.DATA };
//            cursor = getContentResolver().query(imageUri, proj, null, null, null);
//            int column_index = 0;
//            if (cursor != null) {
//                column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
//                cursor.moveToFirst();
//                path = cursor.getString(column_index);
//            }
//        } finally {
//            if (cursor != null) {
//                cursor.close();
//            }
//        }
//        if(path!=null) {
//            File fdelete = new File(path);
//            if (fdelete.exists()) {
//                if (fdelete.delete()) {
//                    System.out.println("file Deleted :" + path);
//                } else {
//                    System.out.println("file not Deleted :" + path);
//                }
//            }
//        }
//    }
//
//    private boolean hasExternalStoragePermission() {
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//            if (checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
//                    == PackageManager.PERMISSION_GRANTED && checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
//            ==PackageManager.PERMISSION_GRANTED) {
//                Log.v("StoragePermission", "Permission is granted");
//                return true;
//            } else {
//
//                Log.v("StoragePermission", "Permission is revoked");
//                ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
//                return false;
//            }
//        } else { //permission is automatically granted on sdk<23 upon installation
//            Log.v("StoragePermission", "Permission is granted");
//            return true;
//        }
//
//    }
//
//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        if (grantResults.length == 2 && grantResults[0] == PackageManager.PERMISSION_GRANTED && grantResults[1] == PackageManager.PERMISSION_GRANTED) {
//            Log.v("StoragePermission", "Permission: " + permissions[0] + "was " + grantResults[0]);
//          try{
//                shareVideo(mShareUrl, mVideoId,mNid,mDeeplinkUrl);
//          } catch(Exception e){
//          }
//    }
//    }
//
//    private void getVideoList(String nid, String site, String deeplinkUrl) {
//        showProgressIndicator(true);
//        mPresenter.getVideoList(nid, site,deeplinkUrl);
//    }
//
//    private void initVideoListRecyclerView() {
//        mVideoListRecyclerView = findViewById(R.id.video_list_recycler_view);
//        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
//        mVideoListRecyclerView.setLayoutManager(linearLayoutManager);
//    }
//
//    @Override
//    public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer youTubePlayer, boolean wasRestored) {
//        if (!wasRestored) {
//            mYoutubePlayer = youTubePlayer;
//            //Following flags are used to enter player into fullscreenview in landscape mode
//            try {
//                mYoutubePlayer.setFullscreenControlFlags(YouTubePlayer.FULLSCREEN_FLAG_CONTROL_ORIENTATION |
//                        YouTubePlayer.FULLSCREEN_FLAG_ALWAYS_FULLSCREEN_IN_LANDSCAPE);
//                if (getIntent() != null && getIntent().getExtras() != null) {
//                    String nid = getIntent().getStringExtra(IntentExtras.EXTRA_NID);
//                    String site = getIntent().getStringExtra(IntentExtras.EXTRA_SITE);
//                    String deeplinkUrl = getIntent().getStringExtra(IntentExtras.DEEPLINK_URL);
//                    getVideoList(nid, site,deeplinkUrl);
//                }
//            } catch (Exception exception) {
//            }
//        }
//    }
//
//
//    @Override
//    public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult errorReason) {
//        if (errorReason.isUserRecoverableError()) {
//            errorReason.getErrorDialog(this, RECOVERY_DIALOG_REQUEST).show();
//        } else {
//            String errorMessage = String.format(/*getString(R.string.error_player),*/ errorReason.toString());
//            Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show();
//        }
//    }
//
//    private YouTubePlayer.Provider getYouTubePlayerProvider() {
//        return (YouTubePlayerView) findViewById(R.id.youtube_view);
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        if (requestCode == RECOVERY_DIALOG_REQUEST) {
//            // Retry initialization if user performed a recovery action
//            getYouTubePlayerProvider().initialize(DEVELOPER_KEY, this);
//        }/* else if(requestCode == REQUEST_CODE_SHARE){
//            deleteImageAfterShare();
//        }*/
//    }
//
//    @Override
//    public void onVideoListFetchSuccess(VideoList videoList, String nid,String deeplinkUrl) {
//        showProgressIndicator(false);
//        if(videoList!=null) {
//            mArticleIdList = videoList.getBookmarkIds();
//            setBookmarkIcon();
//            if (videoList.getVideo() != null) {
//                final String videoId = Uri.parse(videoList.getVideo()).getQueryParameter("v");
//                setVideoDescription(videoList.getLeadText());
//                setVideoTitle(videoList.getTitle());
//                mVideoId = videoId;
//                mDeeplinkUrl= deeplinkUrl;
//                mNid= nid;
//                if (videoList.getFieldPictureRef() != null && videoList.getFieldPictureRef().getUnd() != null &&
//                        !videoList.getFieldPictureRef().getUnd().isEmpty()) {
//                    mShareUrl = videoList.getFieldPictureRef().getUnd().get(0).getImagePath();
//                }
//                try {
//                    mYoutubePlayer.loadVideo(videoId);
//                } catch (Exception exception) {
//                }
//            }
//            mVideoRelation = videoList.getVideoRelation();
//        }
//    }
//
//    @Override
//    public void onVideoItemClick(VideoRelationUnd videoInfo, int position) {
//        if (videoInfo != null && videoInfo.getNid() != null && videoInfo.getSite() != null) {
//            mNid = videoInfo.getNid().toString();
//            mSite = videoInfo.getSite();
//            getVideoList(videoInfo.getNid().toString(), videoInfo.getSite(),videoInfo.getLink());
//        } else{
//            Toast.makeText(MainApplication.getContext(), "Something went wrong...Please try later!", Toast.LENGTH_SHORT).show();
//        }
////        if (mYoutubePlayer != null && videoInfo.getVideo() != null && !(videoInfo.getVideo().isEmpty())
////                && videoInfo.getVideo().get(0).getUri() != null &&
////                Uri.parse(videoInfo.getVideo().get(0).getUri()).
////                        getEncodedPath() != null) {
////            String videoId = Uri.parse(videoInfo.getVideo().get(0).getUri()).getEncodedPath().replace("/", "");
////            mVideoId = videoId;
////            setVideoDescription(videoInfo.getLeadText());
////            setVideoTitle(videoInfo.getTitle());
////            mShareUrl = videoInfo.getImage();
////            mNid = videoInfo.getNid().toString();
////            mSite = videoInfo.getSite();
////            setBookmarkIcon();
////            try {
////                mYoutubePlayer.loadVideo(videoId);
////            } catch (Exception exception) {
////            }
////        } else {
////            Toast.makeText(YouTubeMysampleApplication.getContext(), "Unable to play video, please try again later", Toast.LENGTH_SHORT).show();
////        }
//    }
//
//    @Override
//    public void onShareItemClick(VideoRelationUnd videoInfo, int position) {
//        String videoId = null;
//        if (videoInfo.getVideo() != null && !(videoInfo.getVideo().isEmpty())
//                && videoInfo.getVideo().get(0).getUri() != null &&
//                Uri.parse(videoInfo.getVideo().get(0).getUri()).
//                        getEncodedPath() != null) {
//            videoId = Uri.parse(videoInfo.getVideo().get(0).getUri()).getEncodedPath().replace("/", "");
//
//       }
//      try{
//        shareVideo(videoInfo.getImage(), videoId,videoInfo.getNid().toString(),videoInfo.getLink());
//      }
//       catch(Exception e){
//          }
//    }
//
//    @Override
//    public void onBookmarkItemClick(VideoRelationUnd videoInfo, int position) {
//        SaveBookmarkRequest saveBookmarkRequest = null;
//
//        if (videoInfo != null && videoInfo.getNid() != null && videoInfo.getSite() != null &&
//                !(videoInfo.getSite().isEmpty())) {
//            saveBookmarkRequest = getSaveBookmarkRequest(videoInfo.getNid().
//                    toString(), videoInfo.getSite(), videoInfo.getBookmarked());
//        }
//        if (getBearerToken() != null && saveBookmarkRequest != null) {
//            mPresenter.saveBookmark(saveBookmarkRequest, getBearerToken(), true, videoInfo);
//        } else {
//            Toast.makeText(YoutubePlayerActivity.this, "Something went wrong...Please try later!", Toast.LENGTH_LONG).show();
//        }
//    }
//
//    @Override
//    public void onBrandLogoClicked(VideoRelationUnd videoInfo) {
//        BlueConicModule.launchBrandDetailsPage(videoInfo);
//    }
//
//
//    private void setDataToRecyclerAdapter() {
//        if (mVideoRelation != null) {
//            List<VideoRelationUnd> undList = mVideoRelation.getUnd();
//            if (undList != null && !(undList.isEmpty())) {
//                for (int i = 0; i < undList.size(); i++) {
//                    (undList.get(i)).setPosition(i);
//                    String articleId = undList.get(i).getNid() + "~" + undList.get(i).getSite();
//                    if (mBookmarkIdList != null && !mBookmarkIdList.isEmpty() && mBookmarkIdList.contains(articleId)) {
//                        (undList.get(i)).setBookmarked(true);
//                    } else {
//                        (undList.get(i)).setBookmarked(false);
//                    }
//                }
//            }
//            if (mVideoListRecyclerViewAdapter != null && mVideoListRecyclerViewAdapter.getItemCount() > 0) {
//                mVideoListRecyclerViewAdapter.setData(mVideoRelation);
//                mVideoListRecyclerViewAdapter.notifyDataSetChanged();
//            } else {
//                mVideoListRecyclerViewAdapter = new VideoListRecyclerViewAdapter(mVideoRelation, this);
//                mVideoListRecyclerView.setAdapter(mVideoListRecyclerViewAdapter);
//            }
//        }
//    }
//
//    private void setBookmarkIcon() {
//        if (getBearerToken() != null && getCheckBookmarkRequest() != null) {
//            mPresenter.checkBookmark(getCheckBookmarkRequest(), getBearerToken());
//        }
//    }
//
//    private Map<String, String> getBearerToken() {
//        Map<String, String> bearerToken = new HashMap<>();
//        if (mBearerToken != null &&
//                !(mBearerToken.isEmpty())) {
//            bearerToken.put("Authorization", mBearerToken);
//            return bearerToken;
//        } else {
//            return null;
//        }
//    }
//
//    private CheckBookmarkRequest getCheckBookmarkRequest() {
//        if (mUid != null &&
//                !(mUid.isEmpty())) {
//            CheckBookmarkRequest checkBookmarkRequest = new CheckBookmarkRequest(mUid,
//                    mArticleIdList);
//            return checkBookmarkRequest;
//        } else {
//            return null;
//        }
//    }
//
//    private void setVideoTitle(String title) {
//        if (title != null && !title.isEmpty()) {
//            mVideoTitle.setVisibility(View.VISIBLE);
//            mVideoTitle.setText(title);
//        } else {
//            mVideoTitle.setVisibility(View.GONE);
//        }
//    }
//
//    private void setVideoDescription(String description) {
//        if (description != null && !description.isEmpty()) {
//            mVideoDescription.setVisibility(View.VISIBLE);
//            mVideoDescription.setText(Html.fromHtml(description), TextView.BufferType.SPANNABLE);
//        } else {
//            mVideoDescription.setVisibility(View.GONE);
//        }
//    }
//
//    @Override
//    public void onVideoListFetchFailure() {
//        showProgressIndicator(false);
//        Toast.makeText(this, "Something went wrong...Please try later!", Toast.LENGTH_SHORT).show();
//    }
//
//    @Override
//    public void onCheckBookmarkSuccess(ArrayList<String> bookmarkList) {
//        mBookmarkIdList = bookmarkList;
//        String articleId = mNid + "~" + mSite;
//        if (bookmarkList != null && !bookmarkList.isEmpty() && bookmarkList.contains(articleId)) {
//            mIsBookmarked = true;
//            mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_bookmark));
//        } else {
//            mIsBookmarked = false;
//            mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_un_bookmark));
//        }
//        setDataToRecyclerAdapter();
//    }
//
//    @Override
//    public void onCheckBookmarkFailure() {
//
//    }
//
//    @Override
//    public void onSaveBookmarkSuccess(Map<String, String> status, boolean isFromList, VideoRelationUnd videoInfo) {
//        if (status != null && status.containsKey("status") && status.get("status").equals("Success")) {
//            if (!isFromList) {
//                mIsBookmarked = !mIsBookmarked;
//                if (mIsBookmarked) {
//                    mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_bookmark));
//                } else {
//                    mBookmarkIcon.setImageDrawable(ContextCompat.getDrawable(this, R.drawable.ic_un_bookmark));
//                }
//            } else {
//                if (videoInfo.getBookmarked()) {
//                    videoInfo.setBookmarked(false);
//                } else {
//                    videoInfo.setBookmarked(true);
//                }
//                if(mVideoListRecyclerView.getAdapter()!=null)
//                mVideoListRecyclerView.getAdapter().notifyItemChanged(videoInfo.getPosition());
//            }
//        } else {
//            Toast.makeText(this, "Something went wrong...Please try later!", Toast.LENGTH_SHORT).show();
//        }
//    }
//
//    @Override
//    public void onSaveBookmarkFailure() {
//
//    }
//
//    @Override
//    public void showProgressIndicator(Boolean show) {
//        mProgressBar.setVisibility(show ? View.VISIBLE : View.GONE);
//    }
//
//
//    public void hideStatusBar() {
//        // Hide status bar
//        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//        try {
//            mYoutubePlayer.release();
//        } catch (Exception exception) {
//        }
//    }
//
//
//}