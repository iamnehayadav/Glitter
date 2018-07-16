export interface ILogin {
    email :string
    password :string
  }

  export interface IRegister {
    fName :string
    lName :string
    email :string
    password :string
    phoneNumber :string
    profileImage :string
    country :string
  }

  export interface IReaction {
    id :number
    reactionFlag :boolean
  }

  export interface ITweetPost{
    input :string
  }

  export interface ITweetEdit{
    tid :number
    tweet :string
  }

  export interface ITweetDelete {
      deleteId : number
  }

  export interface IPlayground{
    TID:number
    UID:number
    Tweet : string
    FName : string
    LName : string
    LCount : number
    DCount   : number
    CreatedAt : DateTimeFormat
    LikeFlag : boolean
    DisikeFlag : boolean
  }

  export interface IAnalysis{
    tendingHashtag : string
    totalTweetsToday : number
    mostTweetsBy : string
    mostLikedTweet : string
  }

  export interface IPerson{
    PID : number
    fName : string
    lName : string
    profilePic : string
    FollowingCount : number
    FollowerCount : number
    Country? : string
  }

  export interface IProfile{
    User : IPerson
    Tweets : IPlayground[]
    followFlag : boolean
  }