export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      completed_prompts: {
        Row: {
          date: string
          feedback: string
          id: number
          prompt_id: number
          user_id: string
        }
        Insert: {
          date?: string
          feedback: string
          id?: number
          prompt_id: number
          user_id?: string
        }
        Update: {
          date?: string
          feedback?: string
          id?: number
          prompt_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_completed_prompts_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_completed_prompts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      completed_prompts_test: {
        Row: {
          date: string
          feedback: string
          id: number
          prompt_id: number
          user_id: string
        }
        Insert: {
          date?: string
          feedback: string
          id?: number
          prompt_id: number
          user_id?: string
        }
        Update: {
          date?: string
          feedback?: string
          id?: number
          prompt_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_completed_prompts_test_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_completed_prompts_test_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prompts: {
        Row: {
          id: number
          scene: string
          task: string
        }
        Insert: {
          id?: number
          scene: string
          task: string
        }
        Update: {
          id?: number
          scene?: string
          task?: string
        }
        Relationships: []
      }
      prompts_test: {
        Row: {
          id: number
          scene: string
          task: string
        }
        Insert: {
          id?: number
          scene: string
          task: string
        }
        Update: {
          id?: number
          scene?: string
          task?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          active_prompt: number | null
          id: string
          progress: Database["public"]["Enums"]["progress"]
        }
        Insert: {
          active_prompt?: number | null
          id?: string
          progress: Database["public"]["Enums"]["progress"]
        }
        Update: {
          active_prompt?: number | null
          id?: string
          progress?: Database["public"]["Enums"]["progress"]
        }
        Relationships: [
          {
            foreignKeyName: "public_users_active_prompt_fkey"
            columns: ["active_prompt"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
      users_test: {
        Row: {
          active_prompt: number | null
          id: string
          progress: Database["public"]["Enums"]["progress"]
        }
        Insert: {
          active_prompt?: number | null
          id?: string
          progress: Database["public"]["Enums"]["progress"]
        }
        Update: {
          active_prompt?: number | null
          id?: string
          progress?: Database["public"]["Enums"]["progress"]
        }
        Relationships: [
          {
            foreignKeyName: "public_users_test_active_prompt_fkey"
            columns: ["active_prompt"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      initialize_active_prompt: {
        Args: {
          user_id: string
        }
        Returns: {
          id: number
          scene: string
          task: string
        }[]
      }
    }
    Enums: {
      progress: "in_progress" | "complete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
