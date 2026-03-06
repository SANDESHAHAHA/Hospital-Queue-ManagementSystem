import { useState, useRef } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Separator } from "../../components/ui/separator";

// ─── Seed Data ────────────────────────────────────────────────────────────────

const ME = { id: "me", name: "John Doe", initials: "JD", avatarBg: "bg-green-100 text-green-700", tag: "Patient" };

const INITIAL_POSTS = [
  {
    id: 1,
    author: { id: "u1", name: "Sarah Mitchell", initials: "SM", avatarBg: "bg-emerald-100 text-emerald-700", tag: "Patient" },
    content: "Just finished my 6-month check-up at MediCare and I have to say the cardiology team here is absolutely incredible. Dr. Okonkwo took so much time explaining everything to me. Feeling grateful and optimistic! 💚",
    image: null,
    tag: "Recovery",
    tagColor: "bg-green-100 text-green-700 border-green-200",
    time: "2 hours ago",
    likes: 24,
    dislikes: 1,
    userReaction: null,
    comments: [
      { id: "c1", author: { name: "Priya Sharma", initials: "PS", avatarBg: "bg-teal-100 text-teal-700" }, text: "So happy to hear this! Dr. Okonkwo is the best. Wishing you continued good health 🙏", time: "1h ago", likes: 5, userLiked: false },
      { id: "c2", author: { name: "James K.", initials: "JK", avatarBg: "bg-lime-100 text-lime-700" }, text: "Awesome news! Keep up the great work on your recovery journey.", time: "45m ago", likes: 3, userLiked: false },
    ],
    showComments: true,
  },
  {
    id: 2,
    author: { id: "u2", name: "Marcus Chen", initials: "MC", avatarBg: "bg-lime-100 text-lime-700", tag: "Patient" },
    content: "Week 3 post knee replacement surgery. Pain is manageable now and physio is going well. Anyone else gone through this? Would love to connect with others who've had similar experiences. The recovery road feels long sometimes 😅",
    image: null,
    tag: "Question",
    tagColor: "bg-blue-100 text-blue-700 border-blue-200",
    time: "5 hours ago",
    likes: 18,
    dislikes: 0,
    userReaction: null,
    comments: [
      { id: "c3", author: { name: "Elena V.", initials: "EV", avatarBg: "bg-emerald-100 text-emerald-700" }, text: "I had mine done 8 months ago — it gets SO much better around week 6. Hang tight!", time: "4h ago", likes: 7, userLiked: false },
    ],
    showComments: false,
  },
  {
    id: 3,
    author: { id: "u3", name: "Amara Diallo", initials: "AD", avatarBg: "bg-teal-100 text-teal-700", tag: "Patient" },
    content: "Reminder to everyone managing chronic conditions: your mental health matters just as much as your physical health. I started weekly therapy alongside my treatment plan and the difference is night and day. You deserve full care. 🌿",
    image: null,
    tag: "Wellness",
    tagColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    time: "Yesterday",
    likes: 67,
    dislikes: 2,
    userReaction: null,
    comments: [],
    showComments: false,
  },
  {
    id: 4,
    author: { id: "u4", name: "Kwame Asante", initials: "KA", avatarBg: "bg-green-100 text-green-700", tag: "Patient" },
    content: "Heads up for diabetic patients — the new dietary tracking feature on the MediCare portal is genuinely useful. It syncs with your last lab results. Took me 5 minutes to set up and now I have a clearer picture of what's working.",
    image: null,
    tag: "Tip",
    tagColor: "bg-amber-100 text-amber-700 border-amber-200",
    time: "2 days ago",
    likes: 41,
    dislikes: 3,
    userReaction: null,
    comments: [
      { id: "c4", author: { name: "Sarah M.", initials: "SM", avatarBg: "bg-emerald-100 text-emerald-700" }, text: "Thanks for sharing this! Going to check it out right now.", time: "1d ago", likes: 2, userLiked: false },
      { id: "c5", author: { name: "John Doe", initials: "JD", avatarBg: "bg-green-100 text-green-700" }, text: "This is super helpful, been looking for something like this.", time: "1d ago", likes: 1, userLiked: false },
    ],
    showComments: false,
  },
];

const POST_TAGS = ["General", "Recovery", "Question", "Wellness", "Tip", "Diagnosis", "Medication"];
const TAG_COLORS = {
  General: "bg-gray-100 text-gray-600 border-gray-200",
  Recovery: "bg-green-100 text-green-700 border-green-200",
  Question: "bg-blue-100 text-blue-700 border-blue-200",
  Wellness: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Tip: "bg-amber-100 text-amber-700 border-amber-200",
  Diagnosis: "bg-rose-100 text-rose-600 border-rose-200",
  Medication: "bg-purple-100 text-purple-700 border-purple-200",
};

// ─── Compose Box ──────────────────────────────────────────────────────────────

function ComposeBox({ onPost }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("General");
  const [focused, setFocused] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    onPost({ text, tag });
    setText("");
    setTag("General");
    setFocused(false);
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 ${focused ? "border-green-300 shadow-lg shadow-green-50" : "border-gray-100 shadow-sm"}`}>
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border-2 border-green-100 shrink-0 mt-0.5">
            <AvatarFallback className={`text-sm font-bold ${ME.avatarBg}`}>{ME.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your health journey, ask a question, or leave a tip for fellow patients…"
              value={text}
              onChange={e => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              rows={focused ? 4 : 2}
              className="resize-none border-0 p-0 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />
          </div>
        </div>

        {focused && (
          <div className="mt-3 ml-13 pl-13">
            <div className="flex flex-wrap gap-1.5 mb-3 pl-[52px]">
              {POST_TAGS.map(t => (
                <button key={t} onClick={() => setTag(t)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${tag === t ? TAG_COLORS[t] + " ring-2 ring-offset-1 ring-green-300" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {focused && (
        <>
          <Separator className="bg-gray-50" />
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-400">
              <button className="flex items-center gap-1.5 text-xs font-medium hover:text-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Photo
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium hover:text-green-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Feeling
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setFocused(false); setText(""); }} className="text-xs font-semibold text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <Button onClick={submit} disabled={!text.trim()}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 h-8 rounded-xl disabled:opacity-40">
                Post
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Comment ──────────────────────────────────────────────────────────────────

function Comment({ comment, onLike }) {
  return (
    <div className="flex gap-2.5 group">
      <Avatar className="h-7 w-7 border border-gray-100 shrink-0 mt-0.5">
        <AvatarFallback className={`text-[10px] font-bold ${comment.author.avatarBg}`}>{comment.author.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3 py-2 border border-gray-100">
          <p className="text-xs font-bold text-gray-800">{comment.author.name}</p>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 pl-2">
          <button onClick={onLike}
            className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${comment.userLiked ? "text-green-600" : "text-gray-400 hover:text-green-600"}`}>
            <svg className="w-3 h-3" fill={comment.userLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
            </svg>
            {comment.likes > 0 && comment.likes}
          </button>
          <span className="text-[10px] text-gray-300">{comment.time}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, onLike, onDislike, onComment, onToggleComments, onCommentLike }) {
  const [commentText, setCommentText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const handleCommentClick = () => {
    setShowInput(true);
    onToggleComments(post.id, true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    onComment(post.id, commentText);
    setCommentText("");
  };

  const score = post.likes - post.dislikes;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-200">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-gray-100">
            <AvatarFallback className={`text-sm font-bold ${post.author.avatarBg}`}>{post.author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-semibold text-gray-400 border-gray-200">{post.author.tag}</Badge>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{post.time}</p>
          </div>
        </div>
        <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 shrink-0 border ${post.tagColor}`}>{post.tag}</Badge>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Score bar */}
      <div className="mx-5 mb-3">
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium mb-1">
          <span>{post.likes} likes</span>
          <span className={`font-bold ${score > 0 ? "text-green-600" : score < 0 ? "text-red-500" : "text-gray-400"}`}>
            Score: {score > 0 ? "+" : ""}{score}
          </span>
          <span>{post.dislikes} downvotes</span>
        </div>
        <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
          {(post.likes + post.dislikes) > 0 && (
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(post.likes / (post.likes + post.dislikes)) * 100}%` }} />
          )}
        </div>
      </div>

      <Separator className="bg-gray-50 mx-5" />

      {/* Actions */}
      <div className="px-4 py-2 flex items-center gap-1">
        {/* Like */}
        <button onClick={() => onLike(post.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold flex-1 justify-center transition-all
            ${post.userReaction === "like" ? "bg-green-50 text-green-600" : "text-gray-500 hover:bg-green-50 hover:text-green-600"}`}>
          <svg className="w-4 h-4" fill={post.userReaction === "like" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
          Like {post.likes > 0 && <span className={`text-[10px] ${post.userReaction === "like" ? "text-green-500" : "text-gray-400"}`}>{post.likes}</span>}
        </button>

        {/* Downvote */}
        <button onClick={() => onDislike(post.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold flex-1 justify-center transition-all
            ${post.userReaction === "dislike" ? "bg-red-50 text-red-500" : "text-gray-500 hover:bg-red-50 hover:text-red-500"}`}>
          <svg className="w-4 h-4" fill={post.userReaction === "dislike" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
          </svg>
          Downvote {post.dislikes > 0 && <span className={`text-[10px] ${post.userReaction === "dislike" ? "text-red-400" : "text-gray-400"}`}>{post.dislikes}</span>}
        </button>

        {/* Comment */}
        <button onClick={handleCommentClick}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold flex-1 justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Comment {post.comments.length > 0 && <span className="text-[10px] text-gray-400">{post.comments.length}</span>}
        </button>

        {/* Share */}
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold flex-1 justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
          Share
        </button>
      </div>

      {/* Comments section */}
      {(post.showComments || post.comments.length > 0) && (
        <div className="px-5 pb-4">
          <Separator className="bg-gray-50 mb-3" />

          {/* Toggle comments */}
          {post.comments.length > 0 && (
            <button onClick={() => onToggleComments(post.id)}
              className="text-xs font-bold text-gray-400 hover:text-green-600 mb-3 transition-colors">
              {post.showComments ? "▲ Hide" : `▼ View ${post.comments.length} comment${post.comments.length > 1 ? "s" : ""}`}
            </button>
          )}

          {post.showComments && (
            <div className="space-y-2.5 mb-3">
              {post.comments.map(c => (
                <Comment key={c.id} comment={c} onLike={() => onCommentLike(post.id, c.id)} />
              ))}
            </div>
          )}

          {/* Comment input */}
          {showInput && (
            <div className="flex gap-2.5 mt-2">
              <Avatar className="h-7 w-7 border border-green-100 shrink-0 mt-0.5">
                <AvatarFallback className={`text-[10px] font-bold ${ME.avatarBg}`}>{ME.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <input
                  ref={inputRef}
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && submitComment()}
                  placeholder="Write a comment…"
                  className="flex-1 text-xs bg-gray-50 border border-gray-100 focus:border-green-300 focus:outline-none rounded-2xl px-3 py-2 text-gray-700 placeholder:text-gray-400 transition-colors"
                />
                <button onClick={submitComment} disabled={!commentText.trim()}
                  className="w-8 h-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white rounded-xl flex items-center justify-center transition-colors self-center">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar Widgets ──────────────────────────────────────────────────────────

function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-green-500 to-emerald-400" />
      <div className="px-4 pb-4 -mt-7">
        <Avatar className="h-14 w-14 border-4 border-white shadow mb-2">
          <AvatarFallback className="bg-green-100 text-green-700 text-lg font-extrabold">JD</AvatarFallback>
        </Avatar>
        <p className="font-extrabold text-gray-900 text-sm">John Doe</p>
        <p className="text-xs text-green-600 font-medium">Patient · MediCare HMS</p>
        <Separator className="my-3 bg-gray-100" />
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["12", "Posts"], ["148", "Likes"], ["34", "Comments"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-base font-extrabold text-gray-900">{v}</p>
              <p className="text-[10px] text-gray-400 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendingTags() {
  const tags = [
    { label: "Recovery", count: 24, color: "bg-green-100 text-green-700" },
    { label: "Diabetes", count: 19, color: "bg-amber-100 text-amber-700" },
    { label: "Wellness", count: 15, color: "bg-emerald-100 text-emerald-700" },
    { label: "Question", count: 12, color: "bg-blue-100 text-blue-700" },
    { label: "Medication", count: 8, color: "bg-purple-100 text-purple-700" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mb-3">Trending Topics</p>
      <div className="space-y-2">
        {tags.map(t => (
          <div key={t.label} className="flex items-center justify-between">
            <button className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.color}`}># {t.label}</button>
            <span className="text-[10px] text-gray-400 font-medium">{t.count} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoToFollow() {
  const people = [
    { name: "Dr. Sarah Mitchell", role: "Cardiologist", initials: "SM", bg: "bg-emerald-100 text-emerald-700" },
    { name: "Priya K.", role: "Patient", initials: "PK", bg: "bg-teal-100 text-teal-700" },
    { name: "HealthAdmin", role: "Moderator", initials: "HA", bg: "bg-green-100 text-green-700" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mb-3">Suggested</p>
      <div className="space-y-3">
        {people.map(p => (
          <div key={p.name} className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 border border-gray-100">
              <AvatarFallback className={`text-[10px] font-bold ${p.bg}`}>{p.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">{p.name}</p>
              <p className="text-[10px] text-gray-400">{p.role}</p>
            </div>
            <button className="text-[10px] font-bold text-green-700 border border-green-200 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handlePost = ({ text, tag }) => {
    const newPost = {
      id: Date.now(),
      author: ME,
      content: text,
      image: null,
      tag,
      tagColor: TAG_COLORS[tag],
      time: "Just now",
      likes: 0,
      dislikes: 0,
      userReaction: null,
      comments: [],
      showComments: false,
    };
    setPosts(prev => [newPost, ...prev]);
    showToast("Post shared with the community ✓");
  };

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (p.userReaction === "like") return { ...p, likes: p.likes - 1, userReaction: null };
      return { ...p, likes: p.likes + (p.userReaction === "dislike" ? 1 : 1), dislikes: p.userReaction === "dislike" ? p.dislikes - 1 : p.dislikes, userReaction: "like" };
    }));
  };

  const handleDislike = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (p.userReaction === "dislike") return { ...p, dislikes: p.dislikes - 1, userReaction: null };
      return { ...p, dislikes: p.dislikes + 1, likes: p.userReaction === "like" ? p.likes - 1 : p.likes, userReaction: "dislike" };
    }));
  };

  const handleComment = (postId, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const newComment = {
        id: `c-${Date.now()}`,
        author: { name: ME.name, initials: ME.initials, avatarBg: ME.avatarBg },
        text,
        time: "Just now",
        likes: 0,
        userLiked: false,
      };
      return { ...p, comments: [...p.comments, newComment], showComments: true };
    }));
  };

  const handleToggleComments = (postId, forceOpen) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, showComments: forceOpen !== undefined ? forceOpen : !p.showComments } : p));
  };

  const handleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments: p.comments.map(c => c.id !== commentId ? c : { ...c, likes: c.userLiked ? c.likes - 1 : c.likes + 1, userLiked: !c.userLiked }) };
    }));
  };

  const filters = ["All", "Recovery", "Question", "Wellness", "Tip", "Diagnosis"];
  const filteredPosts = activeFilter === "All" ? posts : posts.filter(p => p.tag === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Left — Feed */}
        <div className="space-y-4">
          {/* Compose */}
          <ComposeBox onPost={handlePost} />

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${activeFilter === f ? "bg-green-600 text-white border-green-600 shadow-sm" : "bg-white text-gray-500 border-gray-100 hover:border-green-200 hover:text-green-700"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Posts */}
          {filteredPosts.length > 0 ? filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onDislike={handleDislike}
              onComment={handleComment}
              onToggleComments={handleToggleComments}
              onCommentLike={handleCommentLike}
            />
          )) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-3xl mb-2">💬</p>
              <p className="font-semibold text-sm">No posts in this category yet</p>
              <p className="text-xs mt-1">Be the first to share!</p>
            </div>
          )}
        </div>

        {/* Right — Sidebar */}
        <div className="hidden lg:flex flex-col gap-4">
          <ProfileCard />
          <TrendingTags />
          <WhoToFollow />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {toast}
        </div>
      )}
    </div>
  );
}