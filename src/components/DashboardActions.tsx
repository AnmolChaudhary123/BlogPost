// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Edit, Trash2, Eye } from 'lucide-react';
// import Link from 'next/link';

// interface Blog {
//   _id: string;
//   title: string;
//   slug: string;
//   status: string;
// }

// interface DashboardActionsProps {
//   blog: Blog;
// }

// export default function DashboardActions({ blog }: DashboardActionsProps) {
//   const router = useRouter();
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       const response = await fetch(`/api/blogs/${blog._id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         router.refresh();
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       alert('Failed to delete post');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {/* View Post */}
//       <Link
//         href={`/blog/${blog.slug}`}
//         className="btn btn-ghost btn-sm"
//         title="View Post"
//       >
//         <Eye className="h-4 w-4" />
//       </Link>

//       {/* Edit Post */}
//       <Link
//         href={`/dashboard/edit/${blog._id}`}
//         className="btn btn-ghost btn-sm"
//         title="Edit Post"
//       >
//         <Edit className="h-4 w-4" />
//       </Link>

//       {/* Delete Post */}
//       <button
//         onClick={handleDelete}
//         disabled={isDeleting}
//         className="btn btn-ghost btn-sm text-destructive hover:text-destructive"
//         title="Delete Post"
//       >
//         {isDeleting ? (
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
//         ) : (
//           <Trash2 className="h-4 w-4" />
//         )}
//       </button>
//     </div>
//   );
// } 



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Edit, Trash2, Eye } from 'lucide-react';
// import Link from 'next/link';

// interface Blog {
//   _id: string;
//   title: string;
//   slug: string;
//   status: string;
//   author:string;
// }

// interface DashboardActionsProps {
//   blog: Blog;
// }

// export default function DashboardActions({ blog }: DashboardActionsProps) {
//   const router = useRouter();
//   const [isDeleting, setIsDeleting] = useState(false);


//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this post?')) return;

//     setIsDeleting(true);
//     console.log('Deleting blog ID:', blog._id); // ✅ Debug log


//     try {
//       const response = await fetch(`/api/blogs/${blog._id}`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();
//       console.log('Delete response:', result); // ✅ Debug log

//       if (response.ok) {
//         alert('Post deleted');
//         router.refresh(); // or router.push('/dashboard')
//       } else {
//         alert(result.message || 'Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       alert('Failed to delete post');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Link href={`/blog/${blog.slug}`} className="btn btn-ghost btn-sm" title="View Post">
//         <Eye className="h-4 w-4" />
//       </Link>

//       <Link href={`/dashboard/edit/${blog._id}`} className="btn btn-ghost btn-sm" title="Edit Post">
//         <Edit className="h-4 w-4" />
//       </Link>

//       <button
//         onClick={handleDelete}
//         disabled={isDeleting}
//         className="btn btn-ghost btn-sm text-destructive hover:text-destructive"
//         title="Delete Post"
//       >
//         {isDeleting ? (
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
//         ) : (
//           <Trash2 className="h-4 w-4" />
//         )}
//       </button>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  status: string;
  author?: {
    _id?: string;
    name: string;
    email?: string;
    role?: string;
  }; 
}

interface DashboardActionsProps {
  blog: Blog;
}

export default function DashboardActions({ blog }: DashboardActionsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUserId = session?.user?.id;
  const currentUserRole = session?.user?.role;

  const isAdmin = currentUserRole === 'admin';
  const isOwner = currentUserId === blog.author;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Delete response:', result);

      if (response.ok) {
        alert('Post deleted');
        router.refresh();
      } else {
        alert(result.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* View Button */}
      <Link
        href={`/blog/${blog.slug}`}
        className="btn btn-ghost btn-sm"
        title="View Post"
      >
        <Eye className="h-4 w-4" />
      </Link>

      {/* Only admin or owner can edit/delete */}
      {(isAdmin || isOwner) && (
        <>
          <Link
            href={`/dashboard/edit/${blog._id}`}
            className="btn btn-ghost btn-sm"
            title="Edit Post"
          >
            <Edit className="h-4 w-4" />
          </Link>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-ghost btn-sm text-destructive hover:text-destructive"
            title="Delete Post"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
