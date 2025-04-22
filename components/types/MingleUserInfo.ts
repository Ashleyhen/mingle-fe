enum Relationship {
    S = "S",
    R = "R",
  }
  
  enum Gender {
    M = "M",
    F = "F",
  }
  
  enum Skill {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
  }
  
  
  enum SportType {
    COED='COED',EXCLUSIVE='EXCLUSIVE'
  }
  
  import dayjs, { Dayjs } from 'dayjs';
  
  type MingleUserInfo ={
    id?: number; // Not nullable
    image?: Uint8Array
    bio?: string; // Optional since @Column(length = 500) isn't nullable
    firstname: string; // Not nullable
    lastname: string; // Not nullable
    username: string; // Unique and not nullable
    password: string; // Not nullable
    zip: string; // Short can be represented as a number, optional
    email: string; // Unique and not nullable
    phone: string; // Optional since it's not marked nullable
    relationship?: Relationship; // Enum
    gender?: Gender; // Enum
    skill?: Skill; // Enum
    birthday?: Dayjs; // Enum
    sporttype?: SportType; // Enum
  }

  export default MingleUserInfo;
  export { Relationship, Skill, Gender,SportType};